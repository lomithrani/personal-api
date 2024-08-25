import { Schema, Types } from 'mongoose';
import { WorkflowStep } from './workflowStep';

interface FormInput {
  label: string;
  name: string;
  type: 'text' | 'number' | 'date' | 'email' | 'checkbox' | 'radio' | 'select' | 'textarea' | 'range';
  options?: string[];
  placeholder?: string;
  required?: boolean;
  defaultValue?: any;
  min?: number;
  max?: number;
}

const formInputSchema = new Schema<FormInput>({
  label: { type: String, required: true },
  name: { type: String, required: true },
  type: {
    type: String,
    required: true,
    enum: ['text', 'number', 'date', 'email', 'checkbox', 'radio', 'select', 'textarea', 'range'],
  },
  options: {
    type: [String],
    required: function (this: FormInput) {
      return this.type === 'select' || this.type === 'radio';
    },
  },
  placeholder: { type: String },
  required: { type: Boolean, default: false },
  defaultValue: { type: Schema.Types.Mixed },
  min: {
    type: Number,
    required: function (this: FormInput) {
      return this.type === 'range' || this.type === 'number';
    },
  },
  max: {
    type: Number,
    required: function (this: FormInput) {
      return this.type === 'range' || this.type === 'number';
    },
  },
});

export interface FormStep extends WorkflowStep {
  inputs: FormInput[];
  createdBy: Types.ObjectId;
  createdAt: Date;
}

const formStepSchema = new Schema<FormStep>({
  inputs: [formInputSchema],
  createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now },
});

export const FormStep = WorkflowStep.discriminator<FormStep>('FormStep', formStepSchema);
