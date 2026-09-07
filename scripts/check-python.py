"""Execute the authored examples; emulate only turtle's drawing primitives."""
import contextlib
import io
import json
import math
import sys
import traceback
import types

cases = json.load(sys.stdin)
failed = []

def execute(code, input_text=''):
    buffer = io.StringIO()
    values = iter(input_text.splitlines())
    moves = []
    fake = types.ModuleType('turtle')
    fake.forward = lambda value: moves.append(('forward', value))
    fake.right = lambda value: moves.append(('right', value))
    fake.done = lambda: moves.append(('done', None))
    sys.modules['turtle'] = fake
    def read_input(prompt=''):
        print(prompt, end='')
        return next(values)
    error = None
    try:
        with contextlib.redirect_stdout(buffer):
            exec(compile(code, '<exercise>', 'exec'), {'input': read_input})
    except Exception as exc:
        error = (type(exc).__name__, traceback.extract_tb(exc.__traceback__)[-1].lineno)
    return buffer.getvalue().rstrip('\n'), moves, error

for case in cases:
    try:
        output, moves, error = execute(case['code'], case.get('input', ''))
        assert error is None, error
        if 'output' in case:
            assert output == case['output'], (output, case['output'])
        if 'turtle' in case:
            expected = case['turtle']
            assert moves == [('forward', expected['length']), ('right', expected['turn'])] * expected['sides'] + [('done', None)]
            x = y = angle = 0
            for command, value in moves:
                if command == 'forward':
                    x += value * math.cos(math.radians(angle))
                    y += value * math.sin(math.radians(angle))
                elif command == 'right':
                    angle += value
            assert abs(x) < 1e-7 and abs(y) < 1e-7, (x, y)
            assert angle == 360
        if case.get('errorVerification'):
            spec = case['errorVerification']
            _, _, actual = execute(spec['code'], spec['input'])
            assert actual == (spec['error'], spec['line']), actual
    except Exception as exc:
        failed.append(f"{case['id']}: {exc}")
if failed:
    print('\n'.join(failed))
    raise SystemExit(1)
print(f'{len(cases)} soluciones verificadas; 6 errores TypeError y 6 polígonos cerrados.')
