import Cathedral from './Cathedral';
import TitleScreen from './screens/title/TitleScreen';

// wrap in an async because assets need to be loaded
void ( async () => {
  const application = new Cathedral();
  application.start();

  // This application goes right to the title screen
  await application.transitionToScreen( new TitleScreen() );

  // enable PhET assertions (and the assert library) for debugging
  // TODO: Remove before production
  // @ts-ignore
  window.assertions.enableAssert();
} )();













