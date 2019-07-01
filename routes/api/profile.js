// users profile goes here
const express = require('express');
const router = express.Router();
const passport = require('passport');
const mongoose = require('mongoose');

// load validation 
const validateProfileInput = require('../../validator/profile');
const validateExperienceInput = require('../../validator/experience');
const validateEducationInput = require('../../validator/education');


// load models
const Profile = require('../../models/Profile');
const User = require('../../models/User');

// @route GET api/profile/all
// @desc GET all profile
// @access public
router.get('/all', (req, res) => {
    const errors = {};
    Profile.find()
        .populate('user', ['name', 'avatar'])
        .then(profile => {
            if (!profile) {
                errors.noprofile = 'There is no profile';
                return res.status(404).json(errors);
            }
            return res.json(profile);
        }).catch(error => res.status(404).json({ profile: 'There is no profiles' }));
})



// @route GET api/profile/handle/:handle
// @desc GET profile handle
// @access public
router.get('/handle/:handle', (req, res) => {

    const errors = {};

    Profile.findOne({ handle: req.params.handle })
        .populate('user', ['name', 'avatar'])
        .then(profile => {
            if (!profile) {
                errors.noprofile = 'There is no profile for this user';
                return res.status(404).json(errors);
            }

            return res.json(profile);
        }).catch(error => res.status(404).json(error));
})


// @route GET api/profile/user/:user_id
// @desc GET profile by user ID
// @access public
router.get('/user/:user_id', (req, res) => {

    const errors = {};

    Profile.findOne({ user: req.params.user_id })
        .populate('user', ['name', 'avatar'])
        .then(profile => {
            if (!profile) {
                errors.noprofile = 'There is no profile for this user';
                res.status(404).json(errors);
            }

            res.json(profile);
        }).catch(error => res.status(404).json({ profile: 'There is no profile for this user id' }));
})



// @route GET api/profile
// @desc get current user profile
// @access private
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    const errors = {};

    Profile.findOne({
        user: req.user.id
    }).populate('user', ['name', 'avatar'])
        .then(profile => {
            if (!profile) {
                errors.noprofile = 'There is no profile for this user';
                return res.status(404).json(errors)
            }
            return res.json(profile);
        }).catch(err => {
            return res.status(500).json(err);
        });

});


// @route POST api/profile
// @desc create or edit user profile
// @access private
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {

    const { errors, isValid } = validateProfileInput(req.body);

    // check validation
    if (!isValid) {
        // return any error with 400 status
        return res.status(400).json(errors);
    }

    // get fields
    const profileFields = {};
    profileFields.user = req.user.id;
    if (req.body.handle) {
        profileFields.handle = req.body.handle;
    }
    if (req.body.company) {
        profileFields.company = req.body.company;
    }
    if (req.body.website) {
        profileFields.website = req.body.website;
    }
    if (req.body.location) {
        profileFields.location = req.body.location;
    }
    if (req.body.status) {
        profileFields.status = req.body.status;
    }
    if (req.body.githubusername) {
        profileFields.githubusername = req.body.githubusername;
    }
    // skills - split into array
    if (typeof req.body.skills !== 'undefined') {
        profileFields.skills = req.body.skills.split(',');
    }
    // Social (optional fields)
    profileFields.social = {};
    if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
    if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
    if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
    if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
    if (req.body.instagram) profileFields.social.instagram = req.body.instagram;


    Profile.findOne({ user: req.user.id })
        .then(profile => {
            if (profile) {
                // update
                Profile.findOneAndUpdate({ user: req.user.id }, { $set: profileFields }, { new: true })
                    .then(profile => res.json(profile));
            } else {
                // create 

                // Check if handle exists
                Profile.findOne({ handle: profileFields.handle }).then(profile => {
                    if (profile) {
                        errors.handle = 'That handle already exists';
                        res.status(400).json(errors);
                    }
                    // save profile
                    new Profile(profileFields).save().then(profile => res.json(profile));
                })
            }
        });

});



// @route POST api/profile/experience
// @desc add experience to profile
// @access Private
router.post('/experience', passport.authenticate('jwt', { session: false }), (req, res) => {
    
    const { errors, isValid } = validateExperienceInput(req.body);

    // check validation
    if (!isValid) {
        // return any error with 400 status
        return res.status(400).json(errors);
    }
    Profile.findOne({ user: req.user.id })
        .then(profile => {
            const newExp = {
                title: req.body.title,
                company: req.body.company,
                location: req.body.location,
                from: req.body.from,
                to: req.body.to,
                current: req.body.current,
                description: req.body.description
            }

            // add to experience array
            profile.experience.unshift(newExp);

            profile.save().then(profile = res.json(profile));
        })
});


// @route POST api/profile/education
// @desc add experience to profile
// @access Private
router.post('/education', passport.authenticate('jwt', { session: false }), (req, res) => {
    
    const { errors, isValid } = validateEducationInput(req.body);

    // check validation
    if (!isValid) {
        // return any error with 400 status
        return res.status(400).json(errors);
    }
    Profile.findOne({ user: req.user.id })
        .then(profile => {
            const newEdu = {
                school: req.body.school,
                degree: req.body.degree,
                fieldofstudy: req.body.fieldofstudy,
                from: req.body.from,
                to: req.body.to,
                current: req.body.current,
                description: req.body.description
            }

            // add to experience array
            profile.education.unshift(newEdu);

            profile.save().then(profile = res.json(profile));
        }).catch(err => {
            return res.status(400).json({ msg: err})
        })
});



// @route DELETE api/profile/experience/:exp_id
// @desc delete experience from profile
// @access Private
router.delete('/experience/:exp_id', passport.authenticate('jwt', { session: false }), (req, res) => {
    
  
    Profile.findOne({ user: req.user.id })
        .then(profile => {
            // get remove index
            const removeIndex = profile.experience
                    .map(item => item.id)
                    .indexOf(req.params.exp_id);


            
            if(removeIndex === -1) {
                return res.status(404).json({ error: "No Experience of this Experience Id exists"});
            }  
        
            // splice out of array
            profile.experience.splice(removeIndex, 1);

            // save 
            profile.save().then(profile => res.json(profile));

        }).catch(err => {
            return res.status(404).json({ msg: err})
        })
});


// @route DELETE api/profile/education/:edu_id
// @desc delete education from profile
// @access Private
router.delete('/education/:edu_id', passport.authenticate('jwt', { session: false }), (req, res) => {
    
  
    Profile.findOne({ user: req.user.id })
        .then(profile => {
            // get remove index
            const removeIndex = profile.education
                    .map(item => item.id)
                    .indexOf(req.params.edu_id);


            if(removeIndex === -1) {
                return res.status(404).json({ error: "No education of this edu Id exists"});
            }        
            // splice out of array
            profile.education.splice(removeIndex, 1);

            // save 
            profile.save().then(profile => res.json(profile));

        }).catch(err => {
            return res.status(404).json({ msg: err})
        })
});



// @route DELETE api/profile
// @desc delete profile
// @access Private
router.delete('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    
  Profile.findOneAndRemove({ user: req.user.id })
         .then(()=>{
             User.findOneAndRemove({ _id: req.user.id})
                .then(() => res.json({ success: true }));
         })
});


module.exports = router;