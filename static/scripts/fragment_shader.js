	window.onload = function init() {
     	var canvas = document.getElementById("canvas2")
		var gl = canvas.getContext("webgl");
		console.log(gl);
		
		
		//~~~~~~~~~~~~~~~ VERTEX SHADER START ~~~~~~~~~~~~~~~~~~~~~~~
		var vshader = ` 
			void main(){
			  gl_Position=vec4(0,0,0,1);gl_PointSize=300.0;
			}
		`;
		
		
		//~~~~~~~~~~~~~~~ FRAGMENT SHADER START ~~~~~~~~~~~~~~~~~~~~~~~
		var fshader = ` 
			precision lowp float;
			uniform float t;
			uniform float resx;
			uniform float resy;
			
			
			#define ASP resx/resy; 
			#define EPS 0.001
			#define S(r,a) smoothstep(r+EPS,r-EPS,a);
		
		//Circle Function
		float circleProj(vec2 uv, vec3 p, float r){
			return S(r/p.z,length(uv-p.xy/(p.z)));
		}
		
		//Rotation Function
		mat2 rot(float a){
			float s = sin(a), c = cos(a);
			return mat2(c,-s,s,c);
		}
		
		//Main function
		void main(){
			vec4 p=vec4(gl_FragCoord.xy/min(resy,resx),0.,1);
			vec2 uv = p.xy-vec2(1.,0.5);
			vec4 col = vec4(0.,0.,0.,0.4);
			float zMax = 5.;
			float xMax = 5.;
			for(float i = -0.5; i <= 0.5; i++){
			for(float j = -0.5; j <= 0.5; j++){
			for(float k = 1. ; k <= 2.; k++){
				vec3 coords = vec3(i,j,k);
				coords.xy *= rot(t*.02);
				coords.z -= 1.5;
				coords.xz *= rot(t*.02);
				coords.z +=1.5;
				col = mix(col,vec4(0.7,0.7,0.7,1.),circleProj(uv*1.6, coords, 0.15));
			}}}
			gl_FragColor=col;
		}`; //FRAGMENT SHADER END
		
		
		var vs = gl.createShader(gl.VERTEX_SHADER);
		gl.shaderSource(vs, vshader);
		gl.compileShader(vs);
		var fs = gl.createShader(gl.FRAGMENT_SHADER);
		gl.shaderSource(fs, fshader);
		gl.compileShader(fs);
		var program = gl.createProgram();
		gl.attachShader(program, vs);
		gl.attachShader(program, fs);
		gl.linkProgram(program);
		gl.useProgram(program);
		var frame = 0;
		setInterval(() => {
			gl.uniform1f(gl.getUniformLocation(program, "t"), frame++);
			gl.uniform1f(gl.getUniformLocation(program, "resx"), canvas.width);
			gl.uniform1f(gl.getUniformLocation(program, "resy"), canvas.height);
			gl.drawArrays(gl.POINTS,0,1);
		},16)
}
