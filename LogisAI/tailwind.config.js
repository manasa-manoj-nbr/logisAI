module.exports = {
    content: [
        './index.html',
        './src/**/*.{html,js}',
    ],
    theme: {
        extend: {
            fontFamily: {
                'serifText': ['"DM Serif Text"', 'serif'],
                'inter' : ['Inter', 'sans-serif'],
              },
            backgroundImage: {
                'chat': 'linear-gradient(135deg, #0a0f2e, #34113b)',
            },
        },
    }
}