module.exports = {
    env: {
        baseURL: 'https://polar-hollows-71390.herokuapp.com',
    },
    async redirects() {
        return [
            {
                source: '/',
                destination: '/patientList/1',
                permanent: true,
            },
        ]
    },
}
