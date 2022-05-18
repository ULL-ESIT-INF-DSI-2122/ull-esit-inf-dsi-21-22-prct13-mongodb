import {Document, model, Schema} from 'mongoose';
import validator from 'validator';

export interface AthleteInterface {
  name: string,
  lastname: string,
  id: string,
  age: number,
  sport: 'athletics' | 'swimming' | 'cycling' | 'boxing',
  expert: string,
  bestRecord: number,
}

export interface AthleteDocumentInterface extends Document {
  name: string,
  lastname: string,
  id: string,
  age: number,
  sport: 'athletics' | 'swimming' | 'cycling' | 'boxing',
  expert: string,
  bestRecord: number,
}

const AthleteSchema = new Schema<AthleteDocumentInterface>({
  name: {
    type: String,
    required: true,
    trim: true,
    validate: (value: string) => {
      if (!value.match(/^[A-Z]/)) {
        throw new Error('Athlete name must start with a capital letter');
      } else if (!validator.isAlpha(value)) {
        throw new Error('Athlete name must contain letters only');
      }
    },
  },
  lastname: {
    type: String,
    trim: true,
    validate: (value: string) => {
      if (!value.match(/^[A-Z]/)) {
        throw new Error('Athlete lastname must start with a capital letter');
      } else if (!validator.isAlpha(value, 'es-ES', {ignore: ' '})) {
        throw new Error('Athlete lastname must contain letters only');
      }
    },
  },
  id: {
    type: String,
    required: true,
    unique: true,
    validate: (value: string) => {
      if (!validator.isIdentityCard(value, 'ES')) {
        throw new Error('Invalid athlete id');
      }
    },
  },
  age: {
    type: Number,
    required: true,
    validate: (value: number) => {
      if (value < 18) {
        throw new Error('Athlete age must be over 18');
      }
    },
  },
  sport: {
    type: String,
    required: true,
    enum: ['athletics', 'swimming', 'cycling', 'boxing'],
  },
  expert: {
    type: String,
    required: true,
    trim: true,
    validate: (value: string) => {
      if (value.length == 0) {
        throw new Error('Expert test cant be empty');
      }
    },
  },
  bestRecord: {
    type: Number,
    required: true,
    validate: (value: number) => {
      if (value < 0) {
        throw new Error('The best record value cant be negative');
      }
    },
  },
});

export const Athlete = model<AthleteDocumentInterface>('Athlete', AthleteSchema);