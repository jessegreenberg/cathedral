/**
 * Loads images for use with Scenery Image nodes.  This is a singleton class.
 */
import ModulifiedImageMap from '../../../ModulifiedImageMap';

class SceneryImageLoader {

  // maps the path to the loaded image element to use with a scenery Image node
  public static readonly loadedImageMap = {};

  /**
   * Load an image into the map for use later.
   * @param imagePath
   * @param modulified - whether to use the modulified file (should be in ModulifiedImageMap.ts)
   */
  public static async loadImage( imagePath: string, modulified = true ): Promise<HTMLImageElement> {
    return new Promise( resolve => {

      // @ts-expect-error
      const existingImageElement = SceneryImageLoader.loadedImageMap[ imagePath ];
      if ( existingImageElement ) {

        // image already ready to use, just resolve right away with it
        resolve( existingImageElement );
      }
      else {

        // create a new element - when it is loaded, resolve the Promise
        const imageElement = document.createElement( 'img' );
        imageElement.onload = event => {

          // @ts-expect-error - lame that TS doesn't allow this??
          SceneryImageLoader.loadedImageMap[ imagePath ] = imageElement;
          resolve( imageElement );
        };

        if ( modulified ) {

          // @ts-expect-error - lame that TS doesn't allow this??
          if ( !ModulifiedImageMap[ imagePath ] ) {
            throw new Error( `No modulified image found for ${imagePath}` );
          }

          // @ts-expect-error - lame that TS doesn't allow this??
          imageElement.src = ModulifiedImageMap[ imagePath ];
        }
        else {
          imageElement.src = imagePath;
        }
      }
    } );
  }

  public static getLoadedImage( imagePath: string ): HTMLImageElement {

    // @ts-expect-error
    const imageElement = SceneryImageLoader.loadedImageMap[ imagePath ]!;
    assert && assert( imageElement, 'Image not found, was it loaded/initialized?' );
    return imageElement;
  }
}

export default SceneryImageLoader;