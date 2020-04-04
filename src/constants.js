export default {
  CORE: {
    PHP_SERVER: process.env.PHP_SERVER || 'http://localhost:8008/api',
    NODE_SERVER: process.env.NODE_SERVER || 'http://localhost:8001/api',
    AWS_S3: process.env.AWS_S3 || 'https://comp1640-s3.s3.amazonaws.com/'
  },
  role: {
    ADMIN: 'admin',
    STAFF: 'staff',
    TUTOR: 'tutor',
    STUDENT: 'student'
  },
  ROLE_COLOR: {
    ADMIN: '#c62828',
    STAFF: '#ee5b18',
    TUTOR: '#1565c0',
    STUDENT: '#2e7e32'
  }
};
