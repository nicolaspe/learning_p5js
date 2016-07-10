# Introducción a la Programación Creativa
2016-07-10, by Aarón Montoya

## General
- Con dos slash haces comentarios! Con eso puedes explicar las instrucciones, notas para tí u otra persona, etc.
- Highlight de palabras claves (case sensitive)
- camelCase
- al modificar una línea de código, podríamos modificar líneas anteriores. para evitar esto, generamos **funciones**
  - función(argumentos); (javascript no exige el ';' final, pero es buena práctica ponerlo siempre)
  - funciones hacen cosas, variables tienen datos
  - **principio de programación**: "DON'T REPEAT YOURSELF!" puedes escribir funciones para evitar escribir lo mismo muchas veces -> conjunto de órdenes
  - **scope** de una variable: si uno lo declara fuera de una función, es **global**, cualquiera puede acceder a ella. si uno la crea dentro de una función, es **local**, sólo puede ser usada dentro de la función.
  - el nombre de la variable debiera tener un nombre que tenga un sentido, que se entienda a que se refiera!
- origen arriba a la izq (0, 0) y aumenta hacia a la derecha (x) y hacia abajo (y)
- el código se *ejecuta de arriba hacia abajo*!
- si no queremos ver el mouse -> `noCursor()`


- **declarar**, esto existe
```javascript
var myFirstVariable;
```
- **asignar**, darle un valor a algo que existe
```javascript
myFirstVariable = 4;
```
- **ejecutar**

## p5.js
- El mecanismo interno de processing, hace que se ejecuten las variables globales, y luego, automáticamente, corre una vez `setup()` y luego `draw()` ad infinitum.
  - `draw()` dibuja hasta 60 veces por segundo! (modificable con `frameRate(x)`)
- Historia de processing y p5js...
- `setup()` y `draw()`, igual que en processing. draw() se hace un máximo de 60 veces por segundo
- [background()](https://p5js.org/reference/#/p5/background), le da un color al fondo del canvas.
  - 1 argumento: grayscale (0-255)
  - 3 argumentos: R, G, B (por defecto) (0-255) cada valor
  - a cada uno se le puede agregar un parámetro extra que es el *alpha* (transparencia) 0:transparente, 255:sólido
- [ellipse()](https://p5js.org/reference/#/p5/ellipse)
```javascript
ellipseMode(CENTER); // o CORNER, según se desee
ellipse(posX, posY, width, height);
```
  - ¿Qué podemos modificarle? drawMode, fill, stroke, posición, ancho, alto.
- `random(x)` genera una número aleatorio entre 0 y x.
- **Recursión/Iteraciones** `for(var i=0; i<100; i++){  }`
- **Variables booleanas** no tienen valor numérico, tienen valor de *verdadero* o *falso*
  ```javascript
  if(){

  } else{

  }
  ```
- Para crear funciones nuevas, uno puede

## EXTRAS
- [Sam Lavigne](lav.io) -> gran artista y creador
  - cmd+T del IDE de p5.js
  - [audiogrep](https://github.com/antiboredom/audiogrep) audio super cuts!
- [Stupid Hackathon](http://www.stupidhackathon.com/)
  - [Potato your face](potatoyourface.com)
- [Hype Framework](http://www.hypeframework.org/)
