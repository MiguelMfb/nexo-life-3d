# Causas y consecuencias

`process(state, command)` valida antes de clonar. Los comandos inválidos devuelven la misma referencia y no cambian saldo, reloj ni RNG. El Worker acepta un único comando a la vez desde la UI. El reloj diario dispara fechas de vencimiento; el render y los modos no disparan pagos. Un salario se prorratea por días trabajados, se liquida al renunciar y se reinicia el acumulador. Transferencias positivas en centavos conservan la suma de cuentas; gastos sin efectivo crean deuda con la cuenta banco como contraparte.

Cada evento tiene ID estable, tick, categoría, razones, padres causales y efectos. Becas: notas ≥70, ingreso familiar ≤160.000 centavos, capacidad educativa ≥65. Matrícula: mayoría de edad y notas ≥60, coste cubierto por beca o ahorros. Graduación: 120 asistencias universidad / 30 técnica, notas ≥60, habilidad ≥45 / ≥25. Tecnología: diploma universitario + habilidad ≥45; administración: diploma + habilidad ≥25. El contrato referencia la matrícula y el diploma conserva el origen académico.

Trabajo: 7–8 horas y recorrido según distrito/transporte reducen tiempo libre. Necesidades influyen en asistencia/desempeño. Menos de 2 horas libres bloquea estudiar/socializar. Agotamiento sostenido puede terminar contrato con desempeño <30. Pareja pierde confianza gradualmente con menos de 3 horas libres. Conversar aumenta confianza y cumple promesas programadas; promesas incumplidas generan un evento siete días después con referencia al compromiso.

Vivienda: empleo + salario ≥2 arriendos + depósito inicial. Gastos mensuales siempre persisten, incluso sin empleo. Más de tres arriendos en deuda termina vivienda y cambia distrito, sin eliminar deuda. Mudarse cambia renta y recorrido. No hay ingreso automático de una pareja que no convive.

El calendario UTC deriva edad de cumpleaños. Los saltos recorren ticks diarios y se detienen ante decisiones o muerte. El final natural ocurre entre 86 y 94 años según semilla; salud crítica debe mantenerse 30 días para producir un final temprano. No hay muerte aleatoria sin causa. El final bloquea acciones y conserva el registro.
