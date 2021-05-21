import React, { useState, useEffect } from 'react';
import { IElement } from '../../types';
import * as THREE from 'three';

type TreeProps = {
  elements: IElement[];
};

function TreeElements(props: TreeProps) {

  const SEPARATION = 100, AMOUNTX = 50, AMOUNTY = 50;

  let container, camera: any, scene: any, renderer: any;

  let particles: any, count = 0;

  let mouseX = 0, mouseY = 0;

  let windowHalfX = window.innerWidth / 2;
  let windowHalfY = window.innerHeight / 2;

  const init = () => {
    container = document.createElement( 'div' );
      document.body.appendChild( container );

				camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
				camera.position.z = 1000;
				camera.position.y = 1000;

        camera.rotation.y = 0.45;

				scene = new THREE.Scene();

				const numParticles = AMOUNTX * AMOUNTY;

				const positions = new Float32Array( numParticles * 3 );
				const scales = new Float32Array( numParticles );

				let i = 0, j = 0;

				for ( let ix = 0; ix < AMOUNTX; ix ++ ) {

					for ( let iy = 0; iy < AMOUNTY; iy ++ ) {

						positions[ i ] = ix * SEPARATION - ( ( AMOUNTX * SEPARATION ) / 2 ); // x
						positions[ i + 1 ] = 0; // y
						positions[ i + 2 ] = iy * SEPARATION - ( ( AMOUNTY * SEPARATION ) / 2 ); // z

						scales[ j ] = 1;

						i += 3;
						j ++;

					}

				}

				const geometry = new THREE.BufferGeometry();
				geometry.setAttribute( 'position', new THREE.BufferAttribute( positions, 3 ) );
				geometry.setAttribute( 'scale', new THREE.BufferAttribute( scales, 1 ) );

        const vertexShaderEl = document.getElementById( 'vertexshader' ) as HTMLScriptElement;
        const fragmentshaderEl = document.getElementById( 'fragmentshader') as HTMLScriptElement; ;

				const material = new THREE.ShaderMaterial( {
					uniforms: {
						color: { value: new THREE.Color( 'black' ) },
					},
					vertexShader: vertexShaderEl.textContent || '',
					fragmentShader: fragmentshaderEl.textContent || ''
				} );

				//

				particles = new THREE.Points( geometry, material );
        scene.background = new THREE.Color( 'white' );
				scene.add( particles );

				//

				renderer = new THREE.WebGLRenderer( { antialias: true } );
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth, window.innerHeight );
				container.appendChild( renderer.domElement );


				container.style.touchAction = 'none';
				container.addEventListener( 'pointermove', onPointerMove );

				//

				window.addEventListener( 'resize', onWindowResize );
  }

  const onWindowResize = () => {

    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

  }

  const onPointerMove = ( event: any ) => {

    if ( event.isPrimary === false ) return;

    mouseX = event.clientX - windowHalfX;
    mouseY = event.clientY - windowHalfY;

  }

  const animate = () => {
    requestAnimationFrame( animate );
    _render();
  }

  const _render = () => {

    camera.position.x += ( mouseX - camera.position.x ) * .05;
    camera.position.y += ( - mouseY - camera.position.y ) * .05;
    camera.lookAt( scene.position );

    const positions = particles.geometry.attributes.position.array;
    const scales = particles.geometry.attributes.scale.array;

    let i = 0, j = 0;

    for ( let ix = 0; ix < AMOUNTX; ix ++ ) {

      for ( let iy = 0; iy < AMOUNTY; iy ++ ) {

        positions[ i + 1 ] = ( Math.sin( ( ix + count ) * 0.3 ) * 50 ) +
                ( Math.sin( ( iy + count ) * 0.5 ) * 50 );

        scales[ j ] = ( Math.sin( ( ix + count ) * 0.3 ) + 1 ) * 20 +
                ( Math.sin( ( iy + count ) * 0.5 ) + 1 ) * 20;

        i += 3;
        j ++;

      }

    }

    particles.geometry.attributes.position.needsUpdate = true;
    particles.geometry.attributes.scale.needsUpdate = true;

    renderer.render( scene, camera );

    count += 0.1;

  }

  useEffect(() => {
    init();
    animate();
  });

  return(
      <div className={'Tree-Elements'}>
        {props.elements.map((element, i) => <div key={`el-${i}`} className={'Tree-Element'}>{element.title}</div>)}
      </div>);
}

export default TreeElements;
