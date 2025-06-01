/**
 * @swagger
 * /patients:
 *   post:
 *     summary: Create a new patient
 *     description: Register a new patient in the system
 *     tags:
 *       - Patients
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PatientCreate'
 *           example:
 *             name: "John Doe"
 *             email: "john.doe@example.com"
 *             password: "securePassword123"
 *             birthDate: "1990-05-15"
 *             cellphone: "+1234567890"
 *     responses:
 *       201:
 *         description: Patient created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/Patient'
 *             example:
 *               data:
 *                 id: "f47ac10b-58cc-4372-a567-0e02b2c3d479"
 *                 name: "John Doe"
 *                 email: "john.doe@example.com"
 *                 birthDate: "1990-05-15"
 *                 cellphone: "+1234567890"
 *                 createdAt: "2024-01-15T10:30:00Z"
 *                 updatedAt: "2024-01-15T10:30:00Z"
 *       400:
 *         description: Bad request - Validation errors or email already exists
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
 *                     details:
 *                       - item: "email"
 *                         message: "Invalid email format"
 *                       - item: "name"
 *                         message: "Name is required"
 *               email_exists:
 *                 summary: Email already exists
 *                 value:
 *                   error: "Bad request: Email already exists"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *   get:
 *     summary: Get all patients
 *     description: Retrieve a list of all patients (Doctor access only)
 *     tags:
 *       - Patients
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of patients retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Patient'
 *             example:
 *               data:
 *                 - id: "f47ac10b-58cc-4372-a567-0e02b2c3d479"
 *                   name: "John Doe"
 *                   email: "john.doe@example.com"
 *                   birthDate: "1990-05-15"
 *                   cellphone: "+1234567890"
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             examples:
 *               missing_token:
 *                 summary: Missing token
 *                 value:
 *                   error: "Unauthorized: Token is missing"
 *               invalid_token:
 *                 summary: Invalid token
 *                 value:
 *                   error: "Unauthorized: Invalid token"
 *       403:
 *         description: Forbidden - Doctor access required
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               error: "Forbidden"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *
 * /patients/{id}:
 *   get:
 *     summary: Get patient by ID
 *     description: Retrieve a specific patient by their ID
 *     tags:
 *       - Patients
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
 *         example: "f47ac10b-58cc-4372-a567-0e02b2c3d479"
 *     responses:
 *       200:
 *         description: Patient retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/Patient'
 *             example:
 *               data:
 *                 id: "f47ac10b-58cc-4372-a567-0e02b2c3d479"
 *                 name: "John Doe"
 *                 email: "john.doe@example.com"
 *                 birthDate: "1990-05-15"
 *                 cellphone: "+1234567890"
 *       400:
 *         description: Bad request - Invalid UUID format
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationErrorResponse'
 *             example:
 *               error:
 *                 message: "Validation errors."
 *                 details:
 *                   - item: ""
 *                     message: "Invalid uuid"
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Patient not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               error: "Resource User for id: f47ac10b-58cc-4372-a567-0e02b2c3d479 not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *   patch:
 *     summary: Update patient
 *     description: Update patient information
 *     tags:
 *       - Patients
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
 *         example: "f47ac10b-58cc-4372-a567-0e02b2c3d479"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PatientUpdate'
 *           example:
 *             name: "John Smith"
 *             cellphone: "+0987654321"
 *     responses:
 *       200:
 *         description: Patient updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/Patient'
 *             example:
 *               data:
 *                 id: "f47ac10b-58cc-4372-a567-0e02b2c3d479"
 *                 name: "John Smith"
 *                 email: "john.doe@example.com"
 *                 birthDate: "1990-05-15"
 *                 cellphone: "+0987654321"
 *       400:
 *         description: Bad request - Validation errors or invalid UUID
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
 *         description: Patient not found
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
 *   delete:
 *     summary: Delete patient
 *     description: Remove a patient from the system
 *     tags:
 *       - Patients
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
 *         example: "f47ac10b-58cc-4372-a567-0e02b2c3d479"
 *     responses:
 *       200:
 *         description: Patient deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "User removed!"
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
 *         description: Patient not found
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
 */
