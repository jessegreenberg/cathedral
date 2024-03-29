# Cathedral

Cathedral is an interactive music video. Interact with robotic musicians in a cathedral to create a musical composition.

## Live Demo

You can play with Cathedral at https://jessegreenberg.github.io/cathedral/.

## Running Locally

To set up and run this project on your local machine, follow these steps:

1) Begin by cloning the repository to your local machine.

2) Run `npm install` to install the necessary dependencies.

3) Ensure you have a Bash shell installed. On Windows I use Git Bash.

4) Artwork Encoding:
The project uses base64 encoded artwork for efficient packaging. To encode the artwork, execute the following commands:
```bash
cd tools
./modulifyImages.sh
./modulifySounds.sh
```
This process generates ModulifiedImageMap.ts and ModulifiedSoundMap.ts in the /js directory.

5) Run `npm run build` to build the project.

5) Download and set up a local server like [http-server](https://www.npmjs.com/package/http-server) to host the files.

6) Run the server in the root directory of the repository.

7) Open your browser and navigate to the server's address to view the project.

## Dependencies and Libraries

Cathedral utilizes [SceneryStack](https://github.com/scenerystack), a collection of libraries from PhET Interactive Simulations, designed for creating multimodal web applications. The project primarily leverages Scenery and its CanvasNode to efficiently animate visuals with high performance.