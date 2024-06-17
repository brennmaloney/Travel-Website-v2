import adapter from '@sveltejs/adapter-node';

const config = {
    kit: {
        // Specify the adapter you are using (in this case, adapter-node)
        adapter: adapter(),

        // Specify the directory where your app.html resides
        appDir: 'src',

        // Specify the template file (app.html) relative to appDir
        files: {
            appTemplate: "./src/app.html",
        },
    },
};

export default config;