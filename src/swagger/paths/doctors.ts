/**
 * @swagger
 * /doctors:
 *   post:
 *     summary: Create a new doctor
 *     description: Register a new doctor in the system
 *     tags:
 *       - Doctors
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DoctorCreate'
 *           example:
 *             name: "Dr. Jane Smith"
 *             email: "jane.smith@hospital.com"
 *             password: "securePassword123"
 *             crm: 123456
 *             specialty: "Cardiology"
 *     responses:
 *       201:
 *         description: Doctor created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/Doctor'
 *             example:
 *               data:
 *                 id: "f47ac10b-58cc-4372-a567-0e02b2c3d479"
 *                 name: "Dr. Jane Smith"
 *                 email: "jane.smith@hospital.com"
 *                 crm: 123456
 *                 specialty: "Cardiology"
 *                 createdAt: "2024-01-15T10:30:00Z"
 *                 updatedAt: "2024-01-15T10:30:00Z"
 *       400:
 *         description: Bad request - Validation errors, CRM or email already exists
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
 *                       - item: "crm"
 *                         message: "CRM must be a positive integer"
 *                       - item: "specialty"
 *                         message: "Specialty is required"
 *               crm_exists:
 *                 summary: CRM already exists
 *                 value:
 *                   error: "Bad request: CRM already exists"
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
 *     summary: Get all doctors
 *     description: Retrieve a list of all doctors
 *     tags:
 *       - Doctors
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of doctors retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Doctor'
 *             example:
 *               data:
 *                 - id: "f47ac10b-58cc-4372-a567-0e02b2c3d479"
 *                   name: "Dr. Jane Smith"
 *                   email: "jane.smith@hospital.com"
 *                   crm: 123456
 *                   specialty: "Cardiology"
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
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *
 * /doctors/{id}:
 *   get:
 *     summary: Get doctor by ID
 *     description: Retrieve a specific doctor by their ID
 *     tags:
 *       - Doctors
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
 *         description: Doctor retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/Doctor'
 *             example:
 *               data:
 *                 id: "f47ac10b-58cc-4372-a567-0e02b2c3d479"
 *                 name: "Dr. Jane Smith"
 *                 email: "jane.smith@hospital.com"
 *                 crm: 123456
 *                 specialty: "Cardiology"
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
 *         description: Doctor not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               error: "Resource Doctor for id: f47ac10b-58cc-4372-a567-0e02b2c3d479 not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *   patch:
 *     summary: Update doctor
 *     description: Update doctor information
 *     tags:
 *       - Doctors
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
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DoctorUpdate'
 *           example:
 *             name: "Dr. Jane Anderson"
 *             specialty: "Neurology"
 *     responses:
 *       200:
 *         description: Doctor updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/Doctor'
 *             example:
 *               data:
 *                 id: "f47ac10b-58cc-4372-a567-0e02b2c3d479"
 *                 name: "Dr. Jane Anderson"
 *                 email: "jane.smith@hospital.com"
 *                 crm: 123456
 *                 specialty: "Neurology"
 *       400:
 *         description: Bad request - Validation errors, CRM conflict or invalid UUID
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
 *                       - item: "crm"
 *                         message: "CRM must be a positive integer"
 *               crm_conflict:
 *                 summary: CRM already exists
 *                 value:
 *                   error: "Bad request: CRM already exists"
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Doctor not found
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
 *     summary: Delete doctor
 *     description: Remove a doctor from the system
 *     tags:
 *       - Doctors
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
 *         description: Doctor deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Doctor removed!"
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
 *         description: Doctor not found
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
