import swaggerJSDoc from 'swagger-jsdoc';

const options: swaggerJSDoc.Options = {
  apis: ['./src/swagger/paths/*.ts'],
  definition: {
    components: {
      schemas: {
        Appointment: {
          properties: {
            createdAt: {
              description: 'Creation timestamp',
              format: 'date-time',
              type: 'string',
            },
            date: {
              description: 'Appointment date in DD/MM/YYYY format',
              example: '25/12/2024',
              type: 'string',
            },
            doctor: {
              $ref: '#/components/schemas/Doctor',
            },
            doctorId: {
              description: 'Doctor unique identifier',
              example: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
              format: 'uuid',
              type: 'string',
            },
            hour: {
              description: 'Appointment time',
              example: '14:30',
              type: 'string',
            },
            id: {
              description: 'Appointment unique identifier',
              example: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
              format: 'uuid',
              type: 'string',
            },
            patient: {
              allOf: [
                { $ref: '#/components/schemas/Patient' },
                {
                  properties: {
                    password: false,
                  },
                  type: 'object',
                },
              ],
            },
            patientId: {
              description: 'Patient unique identifier',
              example: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
              format: 'uuid',
              type: 'string',
            },
            updatedAt: {
              description: 'Last update timestamp',
              format: 'date-time',
              type: 'string',
            },
          },
          required: ['date', 'hour', 'doctorId', 'patientId'],
          type: 'object',
        },
        AppointmentCreate: {
          properties: {
            date: {
              description: 'Appointment date in DD/MM/YYYY format',
              example: '25/12/2024',
              type: 'string',
            },
            doctorId: {
              description: 'Doctor unique identifier',
              example: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
              format: 'uuid',
              type: 'string',
            },
            hour: {
              description: 'Appointment time',
              example: '14:30',
              type: 'string',
            },
            patientId: {
              description: 'Patient unique identifier',
              example: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
              format: 'uuid',
              type: 'string',
            },
          },
          required: ['date', 'hour', 'doctorId', 'patientId'],
          type: 'object',
        },
        AppointmentUpdate: {
          properties: {
            date: {
              description: 'Appointment date in DD/MM/YYYY format',
              example: '25/12/2024',
              type: 'string',
            },
            doctorId: {
              description: 'Doctor unique identifier',
              example: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
              format: 'uuid',
              type: 'string',
            },
            hour: {
              description: 'Appointment time',
              example: '14:30',
              type: 'string',
            },
            patientId: {
              description: 'Patient unique identifier',
              example: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
              format: 'uuid',
              type: 'string',
            },
          },
          type: 'object',
        },
        Doctor: {
          properties: {
            createdAt: {
              description: 'Creation timestamp',
              format: 'date-time',
              type: 'string',
            },
            crm: {
              description: 'Doctor CRM number',
              example: 123456,
              type: 'integer',
            },
            email: {
              description: 'Doctor email address',
              example: 'jane.smith@hospital.com',
              format: 'email',
              type: 'string',
            },
            id: {
              description: 'Doctor unique identifier',
              example: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
              format: 'uuid',
              type: 'string',
            },
            name: {
              description: 'Doctor full name',
              example: 'Dr. Jane Smith',
              type: 'string',
            },
            password: {
              description: 'Doctor password',
              example: 'securePassword123',
              type: 'string',
            },
            specialty: {
              description: 'Doctor specialty',
              example: 'Cardiology',
              type: 'string',
            },
            updatedAt: {
              description: 'Last update timestamp',
              format: 'date-time',
              type: 'string',
            },
          },
          required: ['name', 'email', 'password', 'crm', 'specialty'],
          type: 'object',
        },
        DoctorCreate: {
          properties: {
            crm: {
              description: 'Doctor CRM number',
              example: 123456,
              type: 'integer',
            },
            email: {
              description: 'Doctor email address',
              example: 'jane.smith@hospital.com',
              format: 'email',
              type: 'string',
            },
            name: {
              description: 'Doctor full name',
              example: 'Dr. Jane Smith',
              type: 'string',
            },
            password: {
              description: 'Doctor password',
              example: 'securePassword123',
              type: 'string',
            },
            specialty: {
              description: 'Doctor specialty',
              example: 'Cardiology',
              type: 'string',
            },
          },
          required: ['name', 'email', 'password', 'crm', 'specialty'],
          type: 'object',
        },
        DoctorUpdate: {
          properties: {
            crm: {
              description: 'Doctor CRM number',
              example: 123456,
              type: 'integer',
            },
            email: {
              description: 'Doctor email address',
              example: 'jane.smith@hospital.com',
              format: 'email',
              type: 'string',
            },
            name: {
              description: 'Doctor full name',
              example: 'Dr. Jane Smith',
              type: 'string',
            },
            password: {
              description: 'Doctor password',
              example: 'securePassword123',
              type: 'string',
            },
            specialty: {
              description: 'Doctor specialty',
              example: 'Cardiology',
              type: 'string',
            },
          },
          type: 'object',
        },
        ErrorResponse: {
          properties: {
            error: {
              description: 'Error message',
              example: 'Resource not found',
              type: 'string',
            },
          },
          type: 'object',
        },
        LoginRequest: {
          properties: {
            email: {
              description: 'User email address',
              example: 'user@example.com',
              format: 'email',
              type: 'string',
            },
            password: {
              description: 'User password',
              example: 'securePassword123',
              type: 'string',
            },
            type: {
              description: 'User type',
              enum: ['doctor', 'patient'],
              example: 'doctor',
              type: 'string',
            },
          },
          required: ['email', 'password', 'type'],
          type: 'object',
        },
        LoginResponse: {
          properties: {
            data: {
              description: 'JWT authentication token',
              example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
              type: 'string',
            },
          },
          type: 'object',
        },
        Patient: {
          properties: {
            birthDate: {
              description: 'Patient birth date',
              example: '1990-05-15',
              type: 'string',
            },
            cellphone: {
              description: 'Patient cellphone number (optional)',
              example: '+1234567890',
              type: 'string',
            },
            createdAt: {
              description: 'Creation timestamp',
              format: 'date-time',
              type: 'string',
            },
            email: {
              description: 'Patient email address',
              example: 'john.doe@example.com',
              format: 'email',
              type: 'string',
            },
            id: {
              description: 'Patient unique identifier',
              example: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
              format: 'uuid',
              type: 'string',
            },
            name: {
              description: 'Patient full name',
              example: 'John Doe',
              type: 'string',
            },
            password: {
              description: 'Patient password',
              example: 'securePassword123',
              type: 'string',
            },
            updatedAt: {
              description: 'Last update timestamp',
              format: 'date-time',
              type: 'string',
            },
          },
          required: ['name', 'email', 'password', 'birthDate'],
          type: 'object',
        },
        PatientCreate: {
          properties: {
            birthDate: {
              description: 'Patient birth date',
              example: '1990-05-15',
              type: 'string',
            },
            cellphone: {
              description: 'Patient cellphone number (optional)',
              example: '+1234567890',
              type: 'string',
            },
            email: {
              description: 'Patient email address',
              example: 'john.doe@example.com',
              format: 'email',
              type: 'string',
            },
            name: {
              description: 'Patient full name',
              example: 'John Doe',
              type: 'string',
            },
            password: {
              description: 'Patient password',
              example: 'securePassword123',
              type: 'string',
            },
          },
          required: ['name', 'email', 'password', 'birthDate'],
          type: 'object',
        },
        PatientUpdate: {
          properties: {
            birthDate: {
              description: 'Patient birth date',
              example: '1990-05-15',
              type: 'string',
            },
            cellphone: {
              description: 'Patient cellphone number',
              example: '+1234567890',
              type: 'string',
            },
            email: {
              description: 'Patient email address',
              example: 'john.doe@example.com',
              format: 'email',
              type: 'string',
            },
            name: {
              description: 'Patient full name',
              example: 'John Doe',
              type: 'string',
            },
            password: {
              description: 'Patient password',
              example: 'securePassword123',
              type: 'string',
            },
          },
          type: 'object',
        },
        SuccessResponse: {
          properties: {
            data: {
              description: 'Response data',
              type: 'object',
            },
          },
          type: 'object',
        },
        ValidationErrorResponse: {
          properties: {
            error: {
              properties: {
                details: {
                  items: {
                    properties: {
                      item: {
                        example: 'email',
                        type: 'string',
                      },
                      message: {
                        example: 'Invalid email format',
                        type: 'string',
                      },
                    },
                    type: 'object',
                  },
                  type: 'array',
                },
                message: {
                  example: 'Validation errors.',
                  type: 'string',
                },
              },
              type: 'object',
            },
          },
          type: 'object',
        },
      },
      securitySchemes: {
        bearerAuth: {
          bearerFormat: 'JWT',
          scheme: 'bearer',
          type: 'http',
        },
      },
    },
    info: {
      description: 'A comprehensive API for health management',
      title: 'Salus API',
      version: '1.0.0',
    },
    openapi: '3.0.0',
    security: [
      {
        bearerAuth: [],
      },
    ],
    servers: [
      {
        description: 'Development server',
        url: 'http://localhost:3000',
      },
      {
        description: 'Production server',
        url: 'https://salus-api-9h6s.onrender.com',
      },
    ],
  },
};

const specs = swaggerJSDoc(options);

export default specs;
