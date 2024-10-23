export const loginRequest = {
    type: 'object',
    properties: {
        email: {
            type: 'string',
            description: 'User email',
            example: 'exaple@mail.com'
        },
        password: {
            type: 'string',
            description: 'User password',
            example: '123456'
        }
    }
}
 

export const profileResponse = {
    type: 'object',
    properties: {
        id: {
            type: 'string',
            description: 'User id',
            example: '4'
        },
        email: {
            type: 'string',
            description: 'User email',
            example: 'example@mail.com',
        },
        f_name: {
            type: 'string',
            description: 'User first name',
            example: 'Jorge'
        },
        s_name: {
            type: 'string',
            description: 'User second name',
            example: 'Luis'
        },
        f_lastname: {
            type: 'string',
            description: 'User first last name',
            example: 'Sosa'
        },
        s_lastname: {
            type: 'string',
            description: 'User second last name',
            example: 'Nuñez'
        },
        full_name: {
            type: 'string',
            description: 'User full name',
            example: 'Jorge Luis Sosa Nuñez'
        },
        role: {
            type: 'object',
            properties: {
                id: {
                    type: 'number',
                    description: 'Role id',
                    example: 1
                },
                name: {
                    type: 'string',
                    description: 'Role name',
                    example: 'Admin'
                }
            }
        },
    }

}