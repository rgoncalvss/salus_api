/**
 * @swagger
 * /appointments:
 *   post:
 *     summary: Create a new appointment
 *     description: Schedule a new appointment between a doctor and patient
 *     tags:
 *       - Appointments
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AppointmentCreate'
 *           example:
 *             date: "25/12/2024"
 *             hour: "14:30"
 *             doctorId: "f47ac10b-58cc-4372-a567-0e02b2c3d479"
 *             patientId: "a47ac10b-58cc-4372-a567-0e02b2c3d480"
 *     responses:
 *       201:
 *         description: Appointment created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/Appointment'
 *             example:
 *               data:
 *                 id: "b47ac10b-58cc-4372-a567-0e02b2c3d481"
 *                 date: "25/12/2024"
 *                 hour: "14:30"
 *                 doctor:
 *                   id: "f47ac10b-58cc-4372-a567-0e02b2c3d479"
 *                   name: "Dr. Jane Smith"
 *                   email: "jane.smith@hospital.com"
 *                   crm: 123456
 *                   specialty: "Cardiology"
 *                 patient:
 *                   id: "a47ac10b-58cc-4372-a567-0e02b2c3d480"
 *                   name: "John Doe"
 *                   email: "john.doe@example.com"
 *                   birthDate: "1990-05-15"
 *                   cellphone: "+1234567890"
 *                 createdAt: "2024-01-15T10:30:00Z"
 *                 updatedAt: "2024-01-15T10:30:00Z"
 *       400:
 *         description: Bad request - Validation errors or invalid date
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                 - $ref: '#/components/schemas/ValidationErrorResponse'
 *                 - $ref: '#/components/schemas/ErrorResponse'
 *             examples:
 *               validation_error:
 *                 summary: Validation error
 *                 value:
 *                   error:
 *                     message: "Validation errors."
 *                     parsedErrors:
 *                       - item: "date"
 *                         message: "Date is required"
 *                       - item: "doctorId"
 *                         message: "Doctor ID is required"
 *               invalid_date:
 *                 summary: Invalid date format
 *                 value:
 *                   error: "Bad request: Invalid date format. Expected DD/MM/YYYY"
 *               past_date:
 *                 summary: Past date error
 *                 value:
 *                   error: "Bad request: Appointment date cannot be in the past"
 *               wrong_year:
 *                 summary: Wrong year error
 *                 value:
 *                   error: "Bad request: Appointments can only be scheduled for the current year (2024)"
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Doctor or patient not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             examples:
 *               doctor_not_found:
 *                 summary: Doctor not found
 *                 value:
 *                   error: "Resource Doctor with id f47ac10b-58cc-4372-a567-0e02b2c3d479 not found"
 *               patient_not_found:
 *                 summary: Patient not found
 *                 value:
 *                   error: "Resource Patient with id a47ac10b-58cc-4372-a567-0e02b2c3d480 not found"
 *       409:
 *         description: Conflict - Appointment already exists
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               error: "Resource Appointment already exists conflict"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *
 * /appointments/{id}:
 *   get:
 *     summary: Get appointment by ID
 *     description: Retrieve a specific appointment by its ID
 *     tags:
 *       - Appointments
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Appointment unique identifier
 *         example: "b47ac10b-58cc-4372-a567-0e02b2c3d481"
 *     responses:
 *       200:
 *         description: Appointment retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/Appointment'
 *             example:
 *               data:
 *                 id: "b47ac10b-58cc-4372-a567-0e02b2c3d481"
 *                 date: "25/12/2024"
 *                 hour: "14:30"
 *                 doctor:
 *                   id: "f47ac10b-58cc-4372-a567-0e02b2c3d479"
 *                   name: "Dr. Jane Smith"
 *                   email: "jane.smith@hospital.com"
 *                   crm: 123456
 *                   specialty: "Cardiology"
 *                 patient:
 *                   id: "a47ac10b-58cc-4372-a567-0e02b2c3d480"
 *                   name: "John Doe"
 *                   email: "john.doe@example.com"
 *                   birthDate: "1990-05-15"
 *                   cellphone: "+1234567890"
 *       400:
 *         description: Bad request - Invalid UUID format
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationErrorResponse'
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Appointment not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               error: "Resource Appointment with id b47ac10b-58cc-4372-a567-0e02b2c3d481 not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *   patch:
 *     summary: Update appointment
 *     description: Update appointment information
 *     tags:
 *       - Appointments
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Appointment unique identifier
 *         example: "b47ac10b-58cc-4372-a567-0e02b2c3d481"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AppointmentUpdate'
 *           example:
 *             date: "26/12/2024"
 *             hour: "15:00"
 *     responses:
 *       200:
 *         description: Appointment updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/Appointment'
 *       400:
 *         description: Bad request - Validation errors, date without hour, or invalid UUID
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                 - $ref: '#/components/schemas/ValidationErrorResponse'
 *                 - $ref: '#/components/schemas/ErrorResponse'
 *             examples:
 *               validation_error:
 *                 summary: Validation error
 *                 value:
 *                   error:
 *                     message: "Validation errors."
 *                     parsedErrors:
 *                       - item: "date"
 *                         message: "Date is required"
 *               date_without_hour:
 *                 summary: Date without hour
 *                 value:
 *                   error: "Bad request: Cannot update appointment without hour"
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Appointment not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       409:
 *         description: Conflict - Appointment time slot already taken
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *
 * /appointments/doctors/{id}:
 *   get:
 *     summary: Get appointments by doctor ID
 *     description: Retrieve all appointments for a specific doctor
 *     tags:
 *       - Appointments
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Doctor unique identifier
 *         example: "f47ac10b-58cc-4372-a567-0e02b2c3d479"
 *     responses:
 *       200:
 *         description: Doctor appointments retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Appointment'
 *             example:
 *               data:
 *                 - id: "b47ac10b-58cc-4372-a567-0e02b2c3d481"
 *                   date: "25/12/2024"
 *                   hour: "14:30"
 *                   doctor:
 *                     id: "f47ac10b-58cc-4372-a567-0e02b2c3d479"
 *                     name: "Dr. Jane Smith"
 *                     email: "jane.smith@hospital.com"
 *                     crm: 123456
 *                     specialty: "Cardiology"
 *                   patient:
 *                     id: "a47ac10b-58cc-4372-a567-0e02b2c3d480"
 *                     name: "John Doe"
 *                     email: "john.doe@example.com"
 *                     birthDate: "1990-05-15"
 *                     cellphone: "+1234567890"
 *       400:
 *         description: Bad request - Invalid UUID format
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationErrorResponse'
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: No appointments found for doctor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               error: "Resource No appointments found for doctor with id f47ac10b-58cc-4372-a567-0e02b2c3d479 not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *
 * /appointments/patients/{id}:
 *   get:
 *     summary: Get appointments by patient ID
 *     description: Retrieve all appointments for a specific patient
 *     tags:
 *       - Appointments
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Patient unique identifier
 *         example: "a47ac10b-58cc-4372-a567-0e02b2c3d480"
 *     responses:
 *       200:
 *         description: Patient appointments retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Appointment'
 *             example:
 *               data:
 *                 - id: "b47ac10b-58cc-4372-a567-0e02b2c3d481"
 *                   date: "25/12/2024"
 *                   hour: "14:30"
 *                   doctor:
 *                     id: "f47ac10b-58cc-4372-a567-0e02b2c3d479"
 *                     name: "Dr. Jane Smith"
 *                     email: "jane.smith@hospital.com"
 *                     crm: 123456
 *                     specialty: "Cardiology"
 *                   patient:
 *                     id: "a47ac10b-58cc-4372-a567-0e02b2c3d480"
 *                     name: "John Doe"
 *                     email: "john.doe@example.com"
 *                     birthDate: "1990-05-15"
 *                     cellphone: "+1234567890"
 *       400:
 *         description: Bad request - Invalid UUID format
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationErrorResponse'
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: No appointments found for patient
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               error: "Resource No appointments found for patient with id a47ac10b-58cc-4372-a567-0e02b2c3d480 not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
