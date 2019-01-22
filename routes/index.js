const axios = require ('axios');
const express = require('express');
const router = express.Router();
const fs = require('fs');
const config = require('../config/config');
const logger = require('../config/winston');
const appRoot = require('app-root-path');
const formidable = require('formidable');
const util = require('util');
const _ = require('lodash');
const { mongoose } = require('../db/mongoose');
const { User } = require('../models/user');
const { authenticate } = require('../middleware/authenticate');

router.route('/login')
  .get((req, res, next) => {
    res.render('authenticate', {
      title: 'SNOW Customer Onboarding'
    });
  })
  .post((req, res, next) => {
    res.render('authenticate', {
      title: 'Authenticated!'
    });
  });

router.route('/')
  .get(authenticate, (req, res, next) => {
    res.render('index', {
      title: 'SNOW Customer Onboarding'
    });
  })
  .post((req, res, next) => {
    res.render('response', {
      title: "Thanks! Customer Onboarding in Progress"
    });
  });

router.route('/upload')
  .get((req, res, next) => {
    res.render('ciportal', {
      title: 'SNOW Customer Onboarding'
    });
  })
  .post((req, res, next) => {
    const form = new formidable.IncomingForm();
    form.uploadDir = `${appRoot}/public/uploads`;
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
      res.writeHead(200, {
        'content-type': 'text/plain'
      });
      res.write('received upload:\n\n');
      res.end(util.inspect({
        fields: fields,
        files: files
      }));
    });
    return;
  });

router.route('/domain')
  .get((req, res, next) => {
    res.render('domain', { title: 'SNOW Customer Onboarding'});
  })
  .post(async (req, res, next) => {
    try {
      const url = config.config.instances[req.body.instances];
      res.render('response', {
        title: 'Thanks! your automated onboarding is now in progress'
      });
      const response = await axios({
        method: 'post',
        url: `${url}/api/now/table/domain`,
        header: {
          "Content-Type": "application/json"
        },
        auth: {
          username: 'admin',
          password: ''
        },
        data: {
          parent: req.body.parent_domain,
          active: "true",
          description: req.body.domain_description,
          type: req.body.domtype,
          default: "false",
          name: req.body.cust_domain,
          primary: req.body.domprimary
        }
      });
    } catch (e) {
      res.send(400);
    }
  });

router.get('/logs', (req, res, next) => {
  res.render('logs', { title: 'SNOW Customer Onboarding Logs'});
});

router.route('/location')
  .get((req, res, next) => {
    res.render('location', { title: 'SNOW Customer Onboarding'});
  })
  .post(async (req, res, next) => {
    try {
      const url = config.config.instances[req.body.instances];
      res.render('response', {
        title: 'Thanks! your automated onboarding is now in progress'
      });
      const response = await axios({
        method: 'post',
        url: `${url}/api/now/table/cmn_location`,
        header: {
          "Content-Type": "application/json"
        },
        auth: {
          username: 'admin',
          password: ''
        },
        data: {
          name: req.body.lo_name,
          company: req.body.parent_company,
          street: req.body.lo_street,
          city: req.body.lo_city,
          country: req.body.lo_country
        }
      });
    } catch (e) {
      console.log(e);
      res.send(400);
    }
  });

router.post('/users/login', async (req, res) => {
  try {
    const body = _.pick(req.body, ['email', 'password']);
    const user = await User.findByCredentials(body.email, body.password);
    const token = await user.generateAuthToken();
    res.header('x-auth', token).send(user);
  } catch (e) {
    res.status(400).send();
  }
});

router.post('/users', async (req, res) => {
  try {
    const body = _.pick(req.body, ['email', 'password']);
    const user = new User(body);
    const token = await user.generateAuthToken();
    res.header('x-auth', token).send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;
