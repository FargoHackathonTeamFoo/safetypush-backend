const config = {
  dev: {
    postgres: {
      user: 'safetypush',
      database: 'safetypush',
      password: 'safetypush',
      host: 'localhost',
      port: 5432,
      max: 10,
      idleTimeoutMillis: 30000,
    },
  },
}

export default config[process.env.SAFETYPUSH_ENV ? process.env.SAFETYPUSH_ENV : 'dev']
