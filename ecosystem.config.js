module.exports = {
  apps : [{
    name: 'postgres-backend-test',
    script: 'server.js',
    watch: true,
    env: {
      NODE_ENV: 'development',
      PORT: 4000,
      DB_USERNAME: "postgres",
      DB_PASSWORD: "postgres",
      DB_NAME: "postgres-backend-test",
      DB_HOST: "127.0.0.1",
      DB_DIALECT: "postgres",
      DB_OPERATOR_ALIASES: false,
      SALT_ROUNDS: 10
    },
    env_production: {
      NODE_ENV: 'production',
      PORT: 4000,
      DB_USERNAME: "postgres",
      DB_PASSWORD: "postgres",
      DB_NAME: "postgres-backend-prod",
      DB_HOST: "127.0.0.1",
      DB_DIALECT: "postgres",
      DB_OPERATOR_ALIASES: false,
      SALT_ROUNDS: 10
    }
  }],

  // deploy : {
  //   production : {
  //     user : 'node',
  //     host : '212.83.163.1',
  //     ref  : 'origin/master',
  //     repo : 'git@github.com:repo.git',
  //     path : '/var/www/production',
  //     'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production'
  //   }
  // }
};
