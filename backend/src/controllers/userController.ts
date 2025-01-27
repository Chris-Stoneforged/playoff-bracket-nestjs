import prismaClient, { UserData } from '@playoff-bracket-app/database';
import { Request, Response } from 'express';
import { Role, User } from '@prisma/client';
import { BadRequestError, UnauthorizedError } from '../errors/serverError';
import {
  comparePasswords,
  encryptPassword,
  getCookieData,
} from '../utils/authUtils';

const cookieName = 'playoff-preditor-token';

export async function register(
  request: Request,
  response: Response
): Promise<void> {
  const { email, nickname, password } = request.body;
  if (!email || !nickname || !password) {
    throw new BadRequestError('Missing required information');
  }

  const existingUser = await prismaClient.user.findFirst({
    where: { email: email },
  });

  if (existingUser) {
    throw new BadRequestError('Email is already in use');
  }

  const hashedPassword = await encryptPassword(password);
  const user: User = await prismaClient.user.create({
    data: {
      email: email,
      nickname: nickname,
      role: Role.User,
      password: hashedPassword,
    },
  });

  const userData: UserData = {
    userId: user.id,
    nickname: user.nickname,
    tournaments: [],
  };

  const [token, options] = getCookieData(user);
  response.status(200).cookie(cookieName, token, options).json({
    success: true,
    token: token,
    user: userData,
  });
}

export async function login(
  request: Request,
  response: Response
): Promise<void> {
  const { email, password } = request.body;

  const user = await prismaClient.user.findFirst({
    where: { email: email },
  });

  if (!user) {
    throw new UnauthorizedError('Incorrect email or password');
  }

  const passwordMatch = await comparePasswords(user.password, password);
  if (!passwordMatch) {
    throw new UnauthorizedError('Incorrect email or password');
  }

  const userWithTournaments = await prismaClient.user.findFirst({
    where: {
      id: user.id,
    },
    include: {
      tournaments: {
        include: {
          bracket: true,
        },
      },
    },
  });

  const userData: UserData = {
    userId: userWithTournaments.id,
    nickname: userWithTournaments.nickname,
    tournaments: userWithTournaments.tournaments.map((tournament) => {
      return {
        tournamentId: tournament.id,
        bracketName: tournament.bracket.bracket_name,
      };
    }),
  };

  const [token, options] = getCookieData(user);
  response.status(200).cookie(cookieName, token, options).json({
    success: true,
    token: token,
    user: userData,
  });
}

export async function logout(
  _request: Request,
  response: Response
): Promise<void> {
  response
    .status(200)
    .cookie(cookieName, 'none', {
      expires: new Date(Date.now()),
      httpOnly: true,
    })
    .json({
      success: true,
      message: 'Successfully logged out',
    });
}

export async function getUserData(request: Request, response: Response) {
  const userWithTournaments = await prismaClient.user.findFirst({
    where: {
      id: request.user.id,
    },
    include: {
      tournaments: {
        include: {
          bracket: true,
        },
      },
    },
  });

  const userData: UserData = {
    userId: userWithTournaments.id,
    nickname: userWithTournaments.nickname,
    tournaments: userWithTournaments.tournaments.map((tournament) => {
      return {
        tournamentId: tournament.id,
        bracketName: tournament.bracket.bracket_name,
      };
    }),
  };

  response.status(200).json({
    success: true,
    user: userData,
  });
}
