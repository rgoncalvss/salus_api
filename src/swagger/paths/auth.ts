/**
 * @swagger
 * /auth:
 *   post:
 *     summary: User authentication
 *     description: Authenticate a user (doctor or patient) and receive a JWT token
 *     tags:
 *       - Authentication
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *           examples:
 *             doctor:
 *               summary: Doctor login
 *               value:
 *                 email: "doctor@hospital.com"
 *                 password: "securePassword123"
 *                 type: "doctor | patient"
 *             patient:
 *               summary: Patient login
 *               value:
 *                 email: "patient@example.com"
 *                 password: "securePassword123"
 *                 type: "patient"
 *     responses:
 *       200:
 *         description: Successful authentication
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginResponse'
 *             example:
 *               data: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyMzQ1IiwidHlwZSI6ImRvY3RvciIsImlhdCI6MTUxNjIzOTAyMiwiZXhwIjoxNTE2MzI1NDIyfQ.example"
 *       400:
 *         description: Bad request - Validation errors
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationErrorResponse'
 *             example:
 *               error:
 *                 message: "Validation errors."
 *                 parsedErrors:
 *                   - item: "email"
 *                     message: "Invalid email format"
 *                   - item: "type"
 *                     message: "Type is required"
 *       401:
 *         description: Authentication failed
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               error: "Authentication failed"
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               error: "Resource doctor not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               error: "Internal server error"
 */
