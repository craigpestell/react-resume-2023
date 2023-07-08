module.exports = {
  apps: [
    {
      name: 'resume',
      cwd: '/home/repn/work/resume',
      script: 'yarn',
      args: 'start',
      watch: false,
    },
  ],

  deploy: {
    production: {
      user: 'repn',
      host: '24.199.76.78',
      ref: 'origin/main',
      repo: 'https://github.com/craigpestell/react-resume-2023.git',
      path: '/home/repn/web/resume',
      cwd: '/home/repn/web/resume',
      'pre-deploy-local': 'yarn build && scp -r .next repn@24.199.76.78:/home/repn/web/resume/',
      'pre-deploy': 'yarn build',
      'post-deploy': 'pm2 startOrRestart ecosystem.config.js --env production',
    },
  },
};
