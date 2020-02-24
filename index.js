const {smarthome} = require('actions-on-google');
const app = smarthome({
    debug: true,
})

app.onSync((body) => {
    return {
      requestId: body.requestId,
      payload: {
        agentUserId: '123',
        devices: [{
          id: 'smartlight',
          type: 'action.devices.types.LIGHT',
          traits: [
            'action.devices.traits.OnOff',
            'action.devices.traits.Brightness',
            'action.devices.traits.ColorSetting'
          ],
          name: {
            defaultNames: ['TAPIT Smart Lighting'],
            name: 'smart light',
            nicknames: ['tapit light']
          },
          willReportState: false,
          attributes: {
            colorModel: 'rgb'
          },
          deviceInfo: {
            manufacturer: 'TAPIT',
            model: 'hg11',
            hwVersion: '1.2',
            swVersion: '5.4'
          },
          customData: {
            fooValue: 12,
            barValue: false,
            bazValue: 'dancing alpaca'
          }
        },
        {
          id: '123',
          type: 'action.devices.types.BED',
          traits: [
            'action.devices.traits.Modes'
          ],
          name: {
            defaultNames: ['AAA Cybernetics Corporation Bed'],
            name: 'Bed',
            nicknames: ['Electric bed']
          },
          willReportState: true,
          attributes: {
            availableModes: [{
              name: 'massage',
              name_values: [{
                name_synonym: ['massage'],
                lang: 'en'
              }],
              settings: [{
                setting_name: 'lumbar',
                setting_values: [{
                  setting_synonym: ['back', 'middle'],
                  lang: 'en'
                }]
              }, {
                setting_name: 'head',
                setting_values: [{
                  setting_synonym: ['head', 'neck'],
                  lang: 'en'
                }]
              }],
              ordered: true
            }]
          },
          deviceInfo: {
            manufacturer: 'AAA Cybernetics Corporation',
            model: '233451',
            hwVersion: '3.2',
            swVersion: '11.4'
          },
          customData: {
            fooValue: 74,
            barValue: true,
            bazValue: 'lambtwirl'
          }
        },
        
      ]
      }
    };
  });


  app.onQuery((body) => {
    // TODO: Implement QUERY response
    const {requestId} = body;
    const payload = {
      devices: {},
    };
    const queryPromises = [];
    for (const input of body.inputs) {
      for (const device of input.payload.devices) {
        const deviceId = device.id;
        let data = {
            online: true,
            on: true,
            brightness: 80,
            spectrumRGB: 31655, 
        };
        payload.devices[deviceId] = data ;   
      }
    }
    // Wait for all promises to resolve
    return {
        requestId: requestId,
        payload: payload,
      };
  });


  app.onExecute((body) => {
    // TODO: Implement EXECUTE response
    const {requestId} = body;
    const payload = {
      commands: [{
        ids: [],
        status: 'SUCCESS',
        states: {
          online: true,
        },
      }],
    };
    for (const input of body.inputs) {
      for (const command of input.payload.commands) {
        for (const device of command.devices) {
          const deviceId = device.id;
          payload.commands[0].ids.push(deviceId);
          for (const execution of command.execution) {
            const execCommand = execution.command;
            const {params} = execution;
            switch (execCommand) {
            //   case 'action.devices.commands.OnOff':
            //     firebaseRef.child(deviceId).child('OnOff').update({
            //       on: params.on,
            //     });
            //     payload.commands[0].states.on = params.on;
            //     break;
            //   case 'action.devices.commands.BrightnessAbsolute':
            //     firebaseRef.child(deviceId).update({
            //       Brightness: params.brightness,
            //     });
            //     payload.commands[0].states.brightness = params.brightness;
            //     break;
            //   case 'action.devices.commands.ColorAbsolute':
            //     firebaseRef.child(deviceId).child('Color').update({
            //       name: params.color.name,
            //       spectrumRGB: params.color.spectrumRGB,
            //     });
            //     payload.commands[0].states.color = {spectrumRgb: params.color.spectrumRGB};
            //     break;
            }
          }
        }
      }
    }
    return {
      requestId: requestId,
      payload: payload,
    };
  });

  exports.fullfillment = app;