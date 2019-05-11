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
  host: 'localhost:5900',
  basePath: '/api/v1',
  schemes: ['http', 'https'],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT'
      }
    }
  },
  consumes: ['application/json'],
  produces: ['application/json'],
  paths: {
    '/auth/login': {
      post: {
        description: 'User Registration',
        summary: 'localhost:3000/api/v1/auth/login',
        operationId: 'UserSignupPost',
        produces: ['application/json'],
        consumes: ['application/x-www-form-urlencoded'],
        parameters: [
          {
            name: 'firstName',
            in: 'formData',
            type: 'string',
            description: '',
          },
          {
            name: 'lastName',
            in: 'formData',
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
          }
        ],
        responses: {
          201: {
            description: '',
            schema: {
              $ref:
                  '#/definitions/signupResponse',
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
          200: {
            description: '',
            schema: {
              $ref:
                  '#/definitions/signinResponse',
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
                  '#/definitions/signupErrorResponse1',
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
    '/auth/logout': {
      post: {
        security: {
          bearerAuth: ['Authorization']
        },
        description: 'User Logout',
        summary: 'localhost:3000/api/v1/auth/logout',
        operationId: 'UserSignOutPost',
        produces: ['application/json'],
        consumes: ['application/x-www-form-urlencoded'],
        parameters: [],
        responses: {
          200: {
            description: '',
            schema: {
              $ref:
                  '#/definitions/logoutResponse',
            },
            examples: {
              'application/json': {
                message: 'You\'ve logout successfully',
                token: null,
              },
            },
            headers: {},
          },
          404: {
            description: 'Not found',
            schema: {},
            examples: {
              'application/json': {
                message: 'You do not seem to be registered, please sign up or try again'
              }
            },
          },
        },
      },
    },
    '/bucketlists': {
      post: {
        security: {
          bearerAuth: ['admin'],
          ApiKeyAuth: [],
          OAuth2: ['read', 'write']
        },
        description: 'Post A Bucket List',
        summary: 'localhost:3000/api/v1/bucketlists',
        operationId: 'PostBucketlists',
        produces: ['application/json'],
        consumes: ['application/x-www-form-urlencoded'],
        parameters: [{
          name: 'name',
          in: 'formData',
          required: true,
          type: 'string',
          description: 'Bucket List Name',
        }],
        responses: {
          201: {
            description: '',
            schema: {
              $ref:
                  '#/definitions/bucketlistsSuccessResponse',
            },
            examples: {
              'application/json': {
                message: 'Great BucketLists',
                data: {
                  items: [],
                  date_created: '2019-05-10T22:16:12.314Z',
                  _id: '5cd5f88c165dbc46300dafdc',
                  name: 'my went buckelists',
                  created_by: '5cd0b6b2abcd90232c923d27',
                  date_modified: '2019-05-10T22:17:48.894Z',
                  __v: 0
                }
              },
            },
            headers: {},
          },
          409: {
            description: 'Conflict',
            schema: {},
            examples: {
              'application/json': {
                message: 'You have created this bucket list previously'
              }
            },
          },
          401: {
            description: 'Unauthorized',
            schema: {},
            examples: {
              'application/json': {
                message: 'invalid token'
              }
            },
          },
        },
      },
      get: {
        security: {
          bearerAuth: ['admin'],
          ApiKeyAuth: [],
          OAuth2: ['read', 'write']
        },
        description: 'Post A Bucket List',
        summary: 'localhost:3000/api/v1/getBucketlistsSuccessResponse',
        operationId: 'PostBucketlists',
        produces: ['application/json'],
        consumes: ['application/x-www-form-urlencoded'],
        parameters: [],
        responses: {
          200: {
            description: '',
            schema: {
              $ref:
                  '#/definitions/getBucketlistsSuccessResponse',
            },
            examples: {
              'application/json': {
                message: 'BucketList(s) found',
                data: [
                  {
                    items: [],
                    date_created: '2019-05-06T22:34:53.487Z',
                    _id: '5cd0b6e3abcd90232c923d29',
                    name: 'my second buckelists is edited.',
                    created_by: null,
                    date_modified: '2019-05-06T22:36:19.602Z',
                    __v: 0
                  },
                ]
              },
            },
            headers: {},
          },
          401: {
            description: 'Unauthorized',
            schema: {},
            examples: {
              'application/json': {
                message: 'invalid token'
              }
            },
          },
        },
      },
    },
    '/bucketlists/:id': {
      get: {
        security: {
          bearerAuth: ['admin'],
          ApiKeyAuth: [],
          OAuth2: ['read', 'write']
        },
        description: 'Post A Bucket List',
        summary: 'localhost:3000/api/v1/getBucketlistsSuccessResponse',
        operationId: 'GetBucketlists',
        produces: ['application/json'],
        consumes: ['application/x-www-form-urlencoded'],
        parameters: [],
        responses: {
          200: {
            description: '',
            schema: {
              $ref:
                '#/definitions/getBucketlistsSuccessResponse',
            },
            examples: {
              'application/json': {
                message: 'Bucket List successfully fetched',
                data: [
                  {
                    items: [],
                    date_created: '2019-05-06T22:34:53.487Z',
                    _id: '5cd0b6e3abcd90232c923d29',
                    name: 'my second buckelists is edited.',
                    created_by: null,
                    date_modified: '2019-05-06T22:36:19.602Z',
                    __v: 0
                  },
                ]
              },
            },
            headers: {},
          },
          401: {
            description: 'Unauthorized',
            schema: {},
            examples: {
              'application/json': {
                message: 'invalid token'
              }
            },
          },
          404: {
            description: 'Not found',
            schema: {},
            examples: {
              'application/json': {
                message: 'Bucket List not found'
              }
            },
          },
        },
      },
      put: {
        security: {
          bearerAuth: ['admin'],
          ApiKeyAuth: [],
          OAuth2: ['read', 'write']
        },
        description: 'Edit A Bucket List',
        summary: 'localhost:3000/api/v1/putBucketlistsSuccessResponse',
        operationId: 'PutBucketlists',
        produces: ['application/json'],
        consumes: ['application/x-www-form-urlencoded'],
        parameters: [{
          name: 'name',
          in: 'formData',
          required: true,
          type: 'string',
          description: 'Edit Bucket prevoiusly created by changing this field',
        }],
        responses: {
          200: {
            description: '',
            schema: {
              $ref:
              '#/definitions/putBucketlistsSuccessResponse',
            },
            examples: {
              'application/json': {
                message: 'Bucket Lists successfully updated',
                data: [
                  {
                    items: [],
                    date_created: '2019-05-06T22:34:53.487Z',
                    _id: '5cd0b6e3abcd90232c923d29',
                    name: 'my second buckelists is edited.',
                    created_by: null,
                    date_modified: '2019-05-06T22:36:19.602Z',
                    __v: 0
                  },
                ]
              },
            },
            headers: {},
          },
          401: {
            description: 'Unauthorized',
            schema: {},
            examples: {
              'application/json': {
                message: 'invalid token'
              }
            },
          },
          409: {
            description: 'Conflict',
            schema: {},
            examples: {
              'application/json': {
                message: 'You have created this bucket list previously'
              }
            },
          },
        },
      },
      delete: {
        security: {
          bearerAuth: ['admin'],
          ApiKeyAuth: [],
          OAuth2: ['read', 'write']
        },
        description: 'Delete Bucket List',
        summary: 'localhost:3000/api/v1/deleteBucketlistsSuccessResponse',
        operationId: 'DeleteBucketlists',
        produces: ['application/json'],
        consumes: ['application/x-www-form-urlencoded'],
        parameters: [],
        responses: {
          200: {
            description: '',
            schema: {
              $ref:
                '#/definitions/deleteBucketlistsSuccessResponse',
            },
            examples: {
              'application/json': {
                message: 'Bucket List successfully deleted',
              },
            },
            headers: {},
          },
          401: {
            description: 'Unauthorized',
            schema: {},
            examples: {
              'application/json': {
                message: 'invalid token'
              }
            },
          },
        },
      }
    },
    '/bucketlists/:id/items': {
      post: {
        security: {
          bearerAuth: ['admin'],
          ApiKeyAuth: [],
          OAuth2: ['read', 'write']
        },
        description: 'Post A Bucket List',
        summary: 'localhost:3000/api/v1/postBucketlistItemSuccessResponse',
        operationId: 'PostBucketItem',
        produces: ['application/json'],
        consumes: ['application/x-www-form-urlencoded'],
        parameters: [
          {
            name: 'name',
            in: 'formData',
            required: true,
            type: 'string',
            description: '',
          }
        ],
        responses: {
          200: {
            description: '',
            schema: {
              $ref:
                '#/definitions/postBucketlistItemSuccessResponse',
            },
            examples: {
              'application/json': {
                message: 'Bucket item created successfuly',
                data: {
                  done: false,
                  date_created: '2019-05-11T00:12:55.563Z',
                  _id: '5cd61399081213219cbd5d00',
                  name: 'my went buckelists',
                  date_modified: '2019-05-11T00:13:13.057Z',
                  __v: 0
                }
              },
            },
            headers: {},
          },
          401: {
            description: 'Unauthorized',
            schema: {},
            examples: {
              'application/json': {
                message: 'invalid token'
              }
            },
          },
        },
      },
    },
    '/bucketlists/:id/items/:item_id': {
      put: {
        security: {
          bearerAuth: ['admin'],
          ApiKeyAuth: [],
          OAuth2: ['read', 'write']
        },
        description: 'Edit bucket item',
        summary: 'localhost:3000/api/v1/putBucketItemSuccessResponse',
        operationId: 'PutBucketItem',
        produces: ['application/json'],
        consumes: ['application/x-www-form-urlencoded'],
        parameters: [
          {
            name: 'name',
            in: 'formData',
            required: true,
            type: 'string',
            description: '',
          },
          {
            name: 'done',
            in: 'formData',
            type: 'string',
            description: '',
          }
        ],
        responses: {
          200: {
            description: '',
            schema: {
              $ref:
                '#/definitions/putBucketItemSuccessResponse',
            },
            examples: {
              'application/json': {
                message: 'Bucket items successfully updated',
                data: {
                  done: false,
                  date_created: '2019-05-11T00:12:55.563Z',
                  _id: '5cd61399081213219cbd5d00',
                  name: 'my went buckelists',
                  date_modified: '2019-05-11T00:13:13.057Z',
                  __v: 0
                }
              },
            },
            headers: {},
          },
          401: {
            description: 'Unauthorized',
            schema: {},
            examples: {
              'application/json': {
                message: 'invalid token'
              }
            },
          },
        },
      },
      delete: {
        security: {
          bearerAuth: ['admin'],
          ApiKeyAuth: [],
          OAuth2: ['read', 'write']
        },
        description: 'Delete bucket item',
        summary: 'localhost:3000/api/v1/deleteBucketlistItemSuccessResponse',
        operationId: 'DeleteBucketItem',
        produces: ['application/json'],
        consumes: ['application/x-www-form-urlencoded'],
        parameters: [],
        responses: {
          200: {
            description: '',
            schema: {
              $ref:
                '#/definitions/deleteBucketlistItemSuccessResponse',
            },
            examples: {
              'application/json': {
                message: 'Bucket item successfully deleted',
                data: {
                  done: false,
                  date_created: '2019-05-11T00:12:55.563Z',
                  _id: '5cd61399081213219cbd5d00',
                  name: 'my went buckelists',
                  date_modified: '2019-05-11T00:13:13.057Z',
                  __v: 0
                }
              },
            },
            headers: {},
          },
          401: {
            description: 'Unauthorized',
            schema: {},
            examples: {
              'application/json': {
                message: 'invalid token'
              }
            },
          },
        },
      }
    }
  },
  definitions: {
    signupResponse: {
      title: 'localhost:1234/api/v1/auth/signupResponse',
      example: {
        message: 'User created',
        token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImZpcnN0TmFtZSI6IkxhbGFhbGEiLCJsYXN0TmFtZSI6IlJvbWFub3MiLCJpZCI6IjVjMTFjN2YyZDkyYzkyZjQwZGE0ZmQwYSJ9LCJpYXQiOjE1NDQ2NjkxNzAsImV4cCI6MTU0NDY3OTk3MH0.3ZjrouCOV4L0tIdAOrXoBI3oTb2A6ROEjnAtRgG_qqg',
      },
      type: 'object',
      properties: {
        message: {
          type: 'string',
        },
        token: {
          type: 'string',
        },
      },
      required: ['message', 'token'],
    },
    signupErrorResponse1: {
      title: 'localhost:1234/api/v1/user/signupErrorResponse1',
      example: {
        message: 'Invalid Credentials',
        errors: {
          email: ['your email is not valid'],
          password: ['this field is required'],
        },
      },
      type: 'object',
      properties: {
        message: {
          type: 'string',
        },
        errors: {
          $ref: '#/definitions/Errors',
        },
      },
      required: ['message', 'errors'],
    },
    Errors: {
      title: 'Errors',
      type: 'object',
      properties: {
        email: {
          type: 'array',
          items: {
            type: 'string',
          },
        },
        password: {
          type: 'array',
          items: {
            type: 'string',
          },
        },
      },
      required: ['email', 'password'],
    },
    signinResponse: {
      title: 'localhost:1234/api/v1/user/signinResponse',
      example: {
        message: 'successfuly signin',
        token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImZpcnN0TmFtZSI6IkxhbGFhbGEiLCJsYXN0TmFtZSI6IlJvbWFub3MiLCJpZCI6IjVjMTFjN2YyZDkyYzkyZjQwZGE0ZmQwYSJ9LCJpYXQiOjE1NDQ2NjkxNzAsImV4cCI6MTU0NDY3OTk3MH0.3ZjrouCOV4L0tIdAOrXoBI3oTb2A6ROEjnAtRgG_qqg',
      },
      type: 'object',
      properties: {
        message: {
          type: 'string',
        },
        token: {
          type: 'string',
        },
      },
      required: ['message', 'token'],
    },
    logoutResponse: {
      title: 'localhost:1234/api/v1/user/logoutResponse',
      example: {
        message: 'successfuly signin',
        token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImZpcnN0TmFtZSI6IkxhbGFhbGEiLCJsYXN0TmFtZSI6IlJvbWFub3MiLCJpZCI6IjVjMTFjN2YyZDkyYzkyZjQwZGE0ZmQwYSJ9LCJpYXQiOjE1NDQ2NjkxNzAsImV4cCI6MTU0NDY3OTk3MH0.3ZjrouCOV4L0tIdAOrXoBI3oTb2A6ROEjnAtRgG_qqg',
      },
      type: 'object',
      properties: {
        message: {
          type: 'string',
        },
      },
      required: ['message'],
    },
    bucketlistsSuccessResponse: {
      title: 'localhost:1234/api/v1/user/bucketlists',
      example: {
        message: 'Great BucketLists',
        data: {
          items: [],
          date_created: '2019-05-10T23:39:00.371Z',
          _id: '5cd60ba0c635824eb403ff5e',
          name: 'my went buckelistss',
          created_by: '5cd0b6b2abcd90232c923d27',
          date_modified: '2019-05-10T23:39:12.561Z',
          __v: 0
        }
      },
      type: 'object',
      properties: {
        message: {
          type: 'string',
        },
        data: {
          type: 'object',
        },
      },
      required: ['message', 'data'],
    },
    getBucketlistsSuccessResponse: {
      title: 'localhost:1234/api/v1/user/getBucketlistsSuccessResponse',
      example: {
        message: 'BucketList(s) found',
        data: [
          {
            items: [],
            date_created: '2019-05-06T22:34:53.487Z',
            _id: '5cd0b6e3abcd90232c923d29',
            name: 'my second buckelists is edited.',
            created_by: null,
            date_modified: '2019-05-06T22:36:19.602Z',
            __v: 0
          },
        ]
      },
      type: 'object',
      properties: {
        message: {
          type: 'string',
        },
        data: {
          type: 'array',
        },
      },
      required: ['message', 'data'],
    },
    putBucketlistsSuccessResponse: {
      title: 'localhost:1234/api/v1/user/putBucketlistsSuccessResponse',
      example: {
        message: 'Bucket Lists successfully updated',
        data: [
          {
            items: [],
            date_created: '2019-05-06T22:34:53.487Z',
            _id: '5cd0b6e3abcd90232c923d29',
            name: 'my second buckelists is edited.',
            created_by: null,
            date_modified: '2019-05-06T22:36:19.602Z',
            __v: 0
          },
        ]
      },
      type: 'object',
      properties: {
        message: {
          type: 'string',
        },
        data: {
          type: 'array',
        },
      },
      required: ['message', 'data'],
    },
    deleteBucketlistsSuccessResponse: {
      title: 'localhost:1234/api/v1/user/deleteBucketlistsSuccessResponse',
      example: {
        message: 'Bucket Lists successfully deleted',
      },
      type: 'object',
      properties: {
        message: {
          type: 'string',
        },
      },
      required: ['message'],
    },
    postBucketlistItemSuccessResponse: {
      title: 'localhost:1234/api/v1/user/postBucketlistItemSuccessResponse',
      example: {
        message: 'Bucket item created successfuly',
        data: {
          date_created: '2019-05-11T00:12:55.563Z',
          _id: '5cd61399081213219cbd5d00',
          name: 'my went buckelists',
          date_modified: '2019-05-11T00:13:13.057Z',
          __v: 0
        }
      },
      type: 'object',
      properties: {
        message: {
          type: 'string',
        },
        data: {
          type: 'object',
        },
      },
      required: ['message', 'data'],
    },
    putBucketItemSuccessResponse: {
      title: 'localhost:3000/api/v1/putBucketItemSuccessResponse',
      example: {
        message: 'Bucket items successfully updated',
        data: {
          done: true,
          date_created: '2019-05-11T00:12:55.563Z',
          _id: '5cd61399081213219cbd5d00',
          name: 'my went buckelists',
          date_modified: '2019-05-11T00:13:13.057Z',
          __v: 0
        }
      },
      type: 'object',
      properties: {
        message: {
          type: 'string',
        },
        data: {
          type: 'object',
        },
      },
      required: ['message', 'data'],
    },
    deleteBucketlistItemSuccessResponse: {
      title: 'localhost:3000/api/v1/deleteBucketlistItemSuccessResponse',
      example: {
        message: 'Bucket item successfully deleted'
      },
      type: 'object',
      properties: {
        message: {
          type: 'string',
        },
      },
      required: ['message'],
    }
  },
};
