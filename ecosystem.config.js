module.exports = {
  apps : [{
    name: 'resume',
    cwd: '/home/repn/work/react-resume-template',
    script: 'yarn',
    args: 'start',
    interpreter: '/bin/bash',
    watch: false,
  }],

  deploy : {
    production : {
      user : 'repn',
      host : '24.199.76.78',
      ref  : 'origin/main',
      repo : ' https://github.com/craigpestell/react-resume-2023.git',
      path : '/home/repn/web/resume',
      'pre-deploy-local': 'yarn build',
      // 'pre-deploy': ' pm2 stop ecosystem.config.js --env production',
      'post-deploy' : 'pm2 stop ecosystem.config.js production && yarn && yarn build && pm2 start ecosystem.config.js production',
      'pre-setup': ''
    }
  }
};
