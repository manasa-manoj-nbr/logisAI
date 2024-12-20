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
                'chat-btn': 'linear-gradient(to right, #2c335e, #4f135b)',
                'chat-btn-hvr': 'linear-gradient(to right,#4f135b,#2c335e)',
            },
        },
    }
}