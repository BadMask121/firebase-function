#### We are using firebase cloud functions with Express to make api calls

all endpoint are keep under the `./src/api/*` folder to create an api please name the files with `.f.ts` prefix because only those files will be defined as a cloud functions

endpoint will be named in camelcase, which are a concatnation of the relative folders of `\*.f.ts` and the filename
e.g `http://localhost:5001/ftr-mobile-dev/us-central1/auth/forgot-password`

NOTE: only filename that isnt an `index.f.js` will be in camelcase `index.f.js` will resolve to its relative path name

### FOLDER STRUCTURE
