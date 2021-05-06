import Head from 'next/head'
import {NextSeo} from 'next-seo'
import {isDev} from '@@client/lib/util'

const renderTitle = (bits) => bits
    .filter(x => Boolean(x))
    .join(' | ')

export default function Layout({
    children,
    title,
    description = 'Generate and validate EB Tokens with just a few clicks.',
    type = 'website',
}) {
    title = renderTitle([title, 'EB Tokens'])

    return (
        <>
            <NextSeo
                title={title}
                description={description}
                nofollow={isDev()}
                noindex={isDev()}
                openGraph={{
                    type,
                    title,
                    description,
                }}
            />
            <Head>
                <meta name='viewport' content='initial-scale=1.0, width=device-width' />

                <link rel='dns-prefetch' href='https://fonts.googleapis.com' />
                <link rel='dns-prefetch' href='https://fonts.gstatic.com' />

                <link rel='preload' as='style' href='https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,400i,600,600i&display=swap' />
                <link rel='stylesheet' href='https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,400i,600,600i&display=swap'/>

                <link rel='apple-touch-icon' sizes='180x180' href='/images/favicons/apple-touch-icon.png' />
                <link rel='icon' type='image/png' sizes='32x32' href='/images/favicons/favicon-32x32.png' />
                <link rel='icon' type='image/png' sizes='16x16' href='/images/favicons/favicon-16x16.png' />
                <link rel='manifest' href='/site.webmanifest' />
            </Head>
            <main>
                {children}
            </main>
            <style jsx>
                {`
                    @import '@css/variables.css';

                    main {
                        width: 100%;
                        margin: 0;
                        padding: 20px;

                        @media(--md) {
                            width: 600px;
                            margin: 20px auto;
                        }
                    }
                `}
            </style>
        </>
    )
}
