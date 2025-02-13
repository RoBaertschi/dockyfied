import { Hono } from 'hono';
import { serveStatic } from 'hono/bun';
import { logger } from 'hono/logger';
import BaseDocument from './BaseDocument';

function ImageButton() {
    return <button hx-get='/image' hx-target='this' hx-swap="outerHTML">See Meme</button>;
}

const app = new Hono();

app.use(logger())
app.use('/static/*', serveStatic({ root: './' }));

app.get('/', (c) => {
    return c.html(
        <BaseDocument title='Dockyfied'>
            <h1>This is a Dockyfied website</h1>
            <p>Build using <a href='https://htmx.org/'>htmx</a>.</p>
            <ImageButton />
        </BaseDocument>
    );
});

app.get(
    '/image',
    c => {
        return c.html(
            <div id="image">
                <img hx-get='/image-button' id="image-button" hx-swap='outerHTML' style={'height: 250px;'} src='/static/image.png' hx-target='#image' />
                <p>&uarr;</p>
                <p>Click the image above to replace with the button again.</p>
                <br />
                <p id='secret' hx-swap='outerHTML' hx-get='/image2'>Another Meme?</p>
            </div>
        );
    }
);

app.get('/image2',
    c => c.html(<img style={'height: 190px;'} src='/static/image2.png' />)
);

app.get(
    '/image-button',
    c => c.html(<ImageButton />)
);

export default app;
