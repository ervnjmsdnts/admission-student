import { z } from 'zod';

const allowedFileTypes = ['image/png', 'image/jpeg'];

const previousEducationSchema = z.object({
  name: z.string().min(1),
  town: z.string().min(1),
  province: z.string().min(1),
  year: z.string().min(1),
});

const documentSchema = z
  .instanceof(File)
  .refine((file) => allowedFileTypes.includes(file.type))
  .refine((file) => file.size > 0, 'File is required');

export const FormDataSchema = z.object({
  name: z.object({
    family: z.string().min(1),
    first: z.string().min(1),
    middle: z.string().min(1),
  }),
  permanentAddress: z.object({
    town: z.string().min(1),
    province: z.string().min(1),
  }),
  civilStatus: z.string().min(1),
  dateOfBirth: z.date(),
  placeOfBirth: z.string().min(1),
  religion: z.object({
    name: z.string().min(1),
    baptized: z.string().min(1),
    confirmed: z.string().min(1),
  }),
  married: z
    .object({
      isMarried: z.string().min(1),
      ceremony: z.array(z.string()).default([]),
    })
    .refine(
      (data) =>
        data.isMarried === 'yes'
          ? data.ceremony && data.ceremony.length > 0
          : true,
      { path: ['ceremony'] },
    ),
  previousEducation: z.object({
    elementary: previousEducationSchema,
    secondary: previousEducationSchema,
    collegiate: previousEducationSchema,
    graduate: previousEducationSchema,
  }),
  academicHonors: z.string().optional().default(''),
  extraCurricularActivities: z.string().optional().default(''),
  memberInProfessionalOrg: z.string().optional().default(''),
  underGraduateGrade: z.string().min(1),
  gradeInMajorSubjects: z.string().min(1),
  degree: z
    .object({
      status: z.string().min(1),
      desiredDegree: z.string().optional().default(''),
    })
    .refine(
      (data) =>
        data.status === 'degree'
          ? data.desiredDegree && data.desiredDegree.length > 0
          : true,
      { path: ['desiredDegree'] },
    ),
  majorFieldUnits: z.string().min(1),
  minorFieldUnits: z.string().min(1),
  isFullTimeStudent: z.string().min(1),
  presentPosition: z.string().optional().default(''),
  subjectTaught: z.string().optional().default(''),
  references: z
    .array(
      z.object({
        name: z.string().optional(),
        address: z.string().optional(),
      }),
    )
    .default([]),
  documents: z.object({
    honorableDismissal: documentSchema,
    tor: documentSchema, // Transcript of Records
    generalWeightedAverage: documentSchema,
    birthCertificate: documentSchema,
    idPicture: documentSchema, // 2x2 ID Picture
    marriageCertificate: documentSchema.optional(),
  }),
});

export type Inputs = z.infer<typeof FormDataSchema>;
