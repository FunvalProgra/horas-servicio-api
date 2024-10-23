 
const servicesResponse = {
    type: 'object',
    properties: {
        id: { type: 'number', description: 'Service id', example: 1 },
        amount_reported: { type: 'string', description: 'Amount reported', example: '3' },
        amount_approved: { type: 'string', description: 'Amount approved', example: '2' },
        evidence: { type: 'string', description: 'Evidence', example: '1xvvLig6bmgGWvZhReKMCAf_wElJKTjrb' },
        description: { type: 'string', description: 'Description', example: 'Viaje al tiempo, dos dias' },
        comment: { type: 'string', description: 'Comment', example: null },
        status: { type: 'number', description: 'Status', example: 1 },
        user_id: { type: 'number', description: 'User id', example: 11 },
        reviewer_id: { type: 'number', description: 'Reviewer id', example: 11 },
        category_id: { type: 'number', description: 'Category id', example: 1 },
        level: { type: 'number', description: 'Level', example: 1 },
        create_at: { type: 'string', description: 'Created at', example: '2024-10-18T16:51:40.000Z' },
        updated_at: { type: 'string', description: 'Updated at', example: '2024-10-18T16:51:40.000Z' },
        student: {
            type: 'object',
            properties: {
                id: { type: 'number', description: 'Student id', example: 11 },
                email: { type: 'string', description: 'Student email', example: 'example@mail.com' },
                registration_code: { type: 'string', description: 'Student registration code', example: 'jrfctk0145e' },
                name: { type: 'string', description: 'Student name', example: 'Jorge Luis Sosa Nuñez' },
                controller: { type: 'string', description: 'Controller', example: 'Garp  D. Monkey' },
                recruiter: { type: 'string', description: 'Recruiter', example: 'Monkey  D. Lufy' }
            }
        }
    }

}

export { servicesResponse };