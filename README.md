# API da calculadora CME - Equipacare

![Logo Equipacare](./assets/logo-eqpc.webp)
Uma API que tem seu calculo baseada em uma planilha que vem sendo usada pela empresa a muito tempo para fazer orçamentos de seus clientes.

Essa API foi construida com objetivo de se tornar parte de um projeto fullstak, onde o produto final é uma ferramenta freemium, que é um formulario para captura de leads com uma calculadora de equipamentos de CME (Central de Material e Esterilização) no final sendo disponibilizada para o usuario.

A API recebendo algumas informações como:

- Quantidade de salas cirurgicas;
- Quantas cirurgias por sala por dia;
- Quantos leitos de internação;
- Quantos leitos de UTI;
- Quantos leitos de RPA;
- Quantos leitos de observação;
- Quantos leitos hospital dia.

Com essas informações a API é capaz de calcular quantas autoclaves e lavadoras termodesinfectoras o hospital irá precisar no seu CME (Central de Material e Esterilização). Além disso ela traz opções de marcas e modelos, junto com o preço de cada um na resposta.

## Como testar essa API?

- #### Testando em produção

  Utilizando o Swagger
