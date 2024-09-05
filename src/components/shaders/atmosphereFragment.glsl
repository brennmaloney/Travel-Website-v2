varying vec3 vertexNormal;

void main() {
    float intensity = pow(0.45 - dot(vertexNormal, vec3(0.0, 0.0, 1.0)), 2.0);
    gl_FragColor = vec4(0.0, 0.27, 0.62, 1.0) * intensity;
}