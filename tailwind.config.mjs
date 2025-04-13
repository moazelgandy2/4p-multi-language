import withPurgeCss from 'next-purgecss';

/** @type {import('tailwindcss').Config} */
export default withPurgeCss({
  purge : {
    content: [
      "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
      "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
      "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
      "./src/app/*.{js,ts,jsx,tsx,mdx}"
      
    ],
  },
  theme: {
    extend: {
      colors: {
        primary : '#BB3826',
        secondary : '#1a202c'
      },
      container : {
        center : true,
        padding : '1rem'
      },
      screens : {
        sm : '576px',
        md : '768px',
        lg : '992px',
        xl : '1200px',
        '2xl' : '1400px'
      },
      fontSize: {
        'h1': '40px',
        'h2': '35px',
        'h3': '30px',
        'h4': '25px',
        'h5': '22px',
        'h6': '18px',  
        'small' : '14px',
        "title" : "58px",
        "largeTxt" : "30px"
      },
      spacing : {
        "sectionsSpace" : '50px'
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
}
)