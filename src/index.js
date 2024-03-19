/* Use PHP-provided URL to current version's build directory instead of root */
import './webpack-public-path';

import App from './app';
import domReady from '@wordpress/dom-ready';
import { createRoot, render } from '@wordpress/element';

const WP_ADM_PAGE_ROOT_ELEMENT = 'hwa-app';
const HG_ASCI = `                                                                                                     
                                      /%&%/                                     
                          %@&&&&&&&&&&&&&&&&&&&&&&&&&&(                         
                     &&&&&&&&&&&((((((&@&&&&&&&&&&&&&&&&&&&@                    
                 &&&&&&&&&&&&((((((((((((&&&&&&&&&&&&&&&&&&&&&&&                
              &&&&&&&&&&&&&&((((((((((((((&&&&&&&&&&&&&&&&&&&&&&&&&             
           &&&&&&&&&&&&&&&#(((((( ,(((((((((((((((&&(((((&&&&&&&&&&&&#          
         &&&&&&&&&&&&&&&&%(((((((    (((((((((((((((((((((&&&&&&&&&&&&&&        
       &&&&&&&&&&&&&&&&&&((((((((.### .(((((((((((((((( (((&&&&&&&&&&&&&&%      
      &&&&&&&&&&&&&&&&@((((((((( %###.  (((((((((((((#* (((/&&&&&&&&&&&&&&&     
    %&&&&&&&&&&&&&#((((*,,,,,((          (((((((((( ###  (((&&&&&&&&&&&&&&&&.   
   @&&&&&&&&&&#(((((,,,,,,,,,,,,/(((((((((((((((((/.     (((&&&&&&&&&&&&&&&&&&  
  %&&&&&&&&((((((((,,,,,,,*****,,,,((((((((((((((((((((((((((#&&&&&&&&&&&&&&&&* 
  &&&&&&&&(((((((((,,,,,,*****,,,,,,*((((((((((((((((((((((((((((&&&&@&&&&&&&&& 
 @&&&&&&&&&&&&(((((,,,,,*,,*****,,,,,,((((((((((((,,,,,,,,,,,,,,,,,,,,,,,&&&&&&&
 &&&&&&&&&&&&&&&((((,,,,,,,,*******,,,,,,((((((((,,,,,,,,,,,,,,,,,,,,**,,,@&&&&&
.&&&&&&&&&&&&((((((((,,,,,,,,,********,,,,,,,,,//,,,,,*,,,,,,,,,,,,,,,*,,,&&&&&&
&&&&&&&&&&(((((((((((((,,,,,,,,//////////,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,&&&&&&
.&&&&&&&(((((((((((((((((,,,,,,,,////////////,,,,,,,,,,,,,,,,,,,,,,,,,,/&&&&&&&&
 &&&&&&(((((((((((((((((((((,,,,,,,,///////////////,,,,,,,.*&&&&&&&    &&&&&&&&&
 @&&&&&&&&&&&(((((((((((((((((*,,,,,,,,///////////////    ///*,&&&&#  @&&&&&&&&&
  &&&&&&&&&&&&&(((((((((((((((,,**,,,,,,,,////////////  ///////**,&&&&&&&&&&&&& 
  #&&&&&&&&&&&(((((((((((((((((,,,***,,,,,,,,,//////////////////***,@&&&&&&&&&, 
   &&&&&&&&(((((((((((((((((((((,,,,,****,,,,,,,,,///////////////**,,,&&&&&&&#  
    /&&&&((((((((((((((((((((((((,,,,,,******,,,,,,,,,,,*/////,,,,,,,,&&&&&&    
      &((((((((((((((((((#((((((((/,,,,,,,*******,,,,,,,,,,,,,,,,,,,/(&&&&@     
       /(((((((((((((((##(((((((((((,,,,,,,,,*********,,,,,,,/((((((((((&/      
         (((((((((((###(((((((((((((/,,,,,,,,,,,,********(((((((((((((((        
           *(((((&&&&((((((((((((((((,,,,,,,,,,,,,,,,****##((((((((((.          
              (((((&&&((((((((((((((((,,,,,,,,************&&(((((((             
                 ((((&&(((((((((((((((/,,,,,,,,,,,,,,,,,,,&(((((                
                     (#&(((((((((((((((,,,,,,,,,,,,,,,,,,,((                    
                          .((((((((((((,,,,,,,,,,,,,,,                          
                              Welcome to HostGator!
`;
console.log( HG_ASCI );

const HGWPRender = () => {
	const DOM_ELEMENT = document.getElementById( WP_ADM_PAGE_ROOT_ELEMENT );
	if ( null !== DOM_ELEMENT ) {
		if ( 'undefined' !== typeof createRoot ) {
			// WP 6.2+ only
			createRoot( DOM_ELEMENT ).render( <App /> );
		} else if ( 'undefined' !== typeof render ) {
			render( <App />, DOM_ELEMENT );
		}
	}
};

domReady( HGWPRender );
