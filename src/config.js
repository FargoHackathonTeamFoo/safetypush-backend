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
    vapid: {
      subject: 'https://github.com/FargoHackathonTeamFoo',
      privateKey: 'cURV_sK9CI5heQl1FutJftM1IU1onNkWdGqQqQRuSCc',
      publicKey: 'BNo9igrQJhVCpjPnn66mnxc6KgNpEc1VB8387M-s98eT0AAFlWt7VoylrtAc517M3dQzi5L1wAClNnFmo_KxU3c',
      authSecret: 'my_secret_key',
    }
  },
}

export default config[process.env.SAFETYPUSH_ENV ? process.env.SAFETYPUSH_ENV : 'dev']
