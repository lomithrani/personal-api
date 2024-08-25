import { Schema } from 'mongoose';
import { WorkflowStep } from './workflowStep';

enum MeetingType {
  Visio,
  Vocal,
  InPerson
}

export interface MeetingStep extends WorkflowStep {
  available: { start: Date; end: Date }[];
  meetingLength: number;
  type: MeetingType;
}

const meetingStepSchema = new Schema<MeetingStep>({
  available: [
    {
      start: { type: Date, required: true },
      end: { type: Date, required: true },
    },
  ],
  type: { type: Number, required: true, enum: Object.values(MeetingType), default: MeetingType.Visio },
});

export const MeetingStep = WorkflowStep.discriminator<MeetingStep>('MeetingStep', meetingStepSchema);
