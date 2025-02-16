import { Request, Response } from 'express';
import prismaClient, {
  BracketMatchupsData,
} from '@playoff-bracket-app/database';
import { BadRequestError } from '../errors/serverError';
import validateBracketJson from '../utils/bracketValidator';

// Admin route
export async function udpateBracket(
  request: Request,
  response: Response
): Promise<void> {
  const bracketData = request.body.bracketJson as BracketMatchupsData;
  if (!bracketData) {
    throw new BadRequestError('Error parsing bracket JSON.');
  }

  const [isValid, message] = validateBracketJson(bracketData);
  if (!isValid) {
    throw new BadRequestError(`Bad bracket data - ${message}`);
  }

  const bracket = await prismaClient.bracket.upsert({
    where: { bracket_name: bracketData.bracket_name },
    update: {
      left_side_name: bracketData.left_side_name,
      right_side_name: bracketData.right_side_name,
      predictions_locked: bracketData.predictions_locked,
    },
    create: {
      bracket_name: bracketData.bracket_name,
      left_side_name: bracketData.left_side_name,
      right_side_name: bracketData.right_side_name,
      predictions_locked: bracketData.predictions_locked,
    },
  });

  // would be better to bulk delete and create again, but we can't do
  // that here since prediction model has relation to matchup
  for (const matchup of bracketData.matchups) {
    await prismaClient.matchup.upsert({
      where: {
        id_bracket_id: {
          id: matchup.id,
          bracket_id: bracket.id,
        },
      },
      create: {
        id: matchup.id,
        bracket_id: bracket.id,
        ...matchup,
      },
      update: {
        ...matchup,
      },
    });
  }

  response
    .status(200)
    .json({ success: true, message: 'Successfully updated bracket data.' });
}

export async function deleteBracket(request: Request, response: Response) {
  const bracketId = Number.parseInt(request.params.id);
  if (Number.isNaN(bracketId)) {
    throw new BadRequestError('Invalid bracket Id');
  }

  try {
    await prismaClient.bracket.delete({
      where: { id: bracketId },
    });
  } catch (e) {
    throw new BadRequestError(`Could not delete bracket - ${e.message}`);
  }

  response.status(200).json({
    success: true,
    message: 'Successfully deleted bracket',
  });
}

export async function getAvailableBrackets(
  request: Request,
  response: Response
) {
  const brackets = await prismaClient.bracket.findMany();
  response.status(200).json({
    success: true,
    data: brackets,
  });
}
