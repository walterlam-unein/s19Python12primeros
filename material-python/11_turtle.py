# Ejecuta este ejemplo en Python de escritorio con soporte gráfico (Tk).
import turtle

turtle.title("Un recorrido con Python")
turtle.pensize(3)
turtle.color("firebrick")
for lado in range(4):
    turtle.forward(100)
    turtle.right(90)
turtle.done()
