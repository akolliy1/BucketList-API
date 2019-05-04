export default {
  swagger: '2.0',
  info: {
    version: '1.0',
    title: 'BucketList Api',
    description:
        `It is a platform to document list of things to do before one dies. A list of all the things you want to try,
        goals you want to achieve and life experiences you want to have before you die
        `,
    contact: {},
  },
  host: 'localhost:3000',
  basePath: '/api/v1',
  schemes: ['http'],
  consumes: ['application/json'],
  produces: ['application/json'],
  paths: {
    '/user/signup': {
      post: {
        description: 'User Registration',
        summary: 'localhost:3000/api/v1/user/signup',
        operationId: 'UserSignupPost',
        produces: ['application/json'],
        consumes: ['application/x-www-form-urlencoded'],
        parameters: [
          {
            name: 'firstName',
            in: 'formData',
            required: true,
            type: 'string',
            description: '',
          },
          {
            name: 'lastName',
            in: 'formData',
            required: true,
            type: 'string',
            description: '',
          },
          {
            name: 'email',
            in: 'formData',
            required: true,
            type: 'string',
            description: '',
          },
          {
            name: 'password',
            in: 'formData',
            required: true,
            type: 'string',
            description: '',
          },
          {
            name: 'Content-Type',
            in: 'header',
            required: true,
            type: 'string',
            description: '',
          },
        ],
        responses: {
          201: {
            description: '',
            schema: {
              $ref:
                  '#/definitions/localhost:3000~1api~1v1~1user~1signupResponse',
            },
            examples: {
              'application/json': {
                message: 'User created',
                token:
                    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImZpcnN0TmFtZSI6IkxhbGFhbGEiLCJsYXN0TmFtZSI6IlJvbWFub3MiLCJpZCI6IjVjMTFjN2YyZDkyYzkyZjQwZGE0ZmQwYSJ9LCJpYXQiOjE1NDQ2NjkxNzAsImV4cCI6MTU0NDY3OTk3MH0.3ZjrouCOV4L0tIdAOrXoBI3oTb2A6ROEjnAtRgG_qqg',
              },
            },
            headers: {},
          },
          400: {
            description: 'Bad Request',
            schema: {
              $ref:
                  '#/definitions/localhost:3000~1api~1v1~1user~1signupErrorResponse1',
            },
            examples: {
              'application/json': {
                message: 'Invalid Credentials',
                errors: {
                  firstName: ['this field is required'],
                  lastName: ['this field is required'],
                  email: ['your email is not valid'],
                  password: ['this field is required'],
                },
              },
            },
          },
          409: {
            description: 'Conflict',
            schema: {
              $ref:
                  '#/definitions/localhost:3000~1api~1v1~1user~1signupErrorResponse',
            },
            examples: {
              'application/json': {
                message: 'A user with this email already exists',
              },
            },
          },
        },
      },
    },
    '/user/signin': {
      post: {
        description: 'User Signin',
        summary: 'localhost:3000/api/v1/user/signin',
        operationId: 'UserSigninPost',
        produces: ['application/json'],
        consumes: ['application/x-www-form-urlencoded'],
        parameters: [
          {
            name: 'email',
            in: 'formData',
            required: true,
            type: 'string',
            description: '',
          },
          {
            name: 'password',
            in: 'formData',
            required: true,
            type: 'string',
            description: '',
          },
          {
            name: 'Content-Type',
            in: 'header',
            required: true,
            type: 'string',
            description: '',
          },
        ],
        responses: {
          200: {
            description: '',
            schema: {
              $ref:
                  '#/definitions/localhost:3000~1api~1v1~1user~1signinResponse',
            },
            examples: {
              'application/json': {
                message: 'successfuly signin',
                token:
                    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImZpcnN0TmFtZSI6IkxhbGFhbGEiLCJsYXN0TmFtZSI6IlJvbWFub3MiLCJpZCI6IjVjMTFjN2YyZDkyYzkyZjQwZGE0ZmQwYSJ9LCJpYXQiOjE1NDQ2NjkxNzAsImV4cCI6MTU0NDY3OTk3MH0.3ZjrouCOV4L0tIdAOrXoBI3oTb2A6ROEjnAtRgG_qqg',
              },
            },
            headers: {},
          },
          400: {
            description: 'Bad Request',
            schema: {
              $ref:
                  '#/definitions/localhost:3000~1api~1v1~1user~1signinErrorResponse1',
            },
            examples: {
              'application/json': {
                message: 'Invalid Credentials',
                errors: {
                  email: ['your email is not valid'],
                  password: ['this field is required'],
                },
              },
            },
          },
        },
      },
    },
  },
};
