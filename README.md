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

  Você pode testar essa API acessando o deploy do projeto completo neste [Link](https://equipacare-cme.vercel.app/).

- ### Testando localmente

  1. Para rodar a API localmente você vai precisar fazer clonar este repositório na sua máquina.

  ```bash
    git clone https://github.com/robertoDCJ/api-equipacare.git
  ```

  2. Depois você vai precisar rodar o seguinte script para instalar as dependencias do projeto:

  ```bash
    npm install
  ```

  3. Após instalar as dependencias verifique se seu arquivo package.json possui os seguintes scripts:

  ```bash
    "scripts": {
      "build": "prisma generate && tsc",
      "prod": "dist/server.js"
    }
  ```

  4. Tendo esses scripts no seu package.json você já pode rodar os comandos na seguinte ordem.

  ```bash
  npm run build
  ```

  ```bash
  npm run prod
  ```

Fazendo esse passo-a-passo o projeto já tem que estar rodando na sua máquina.

Para testar as rotas pode ser usado algum software como o postman ou insomnia.

Para testar a rota você vai precisar passar o caminho:
EX: "http://localhost:3000/calculadora/calcular-dados"

Usando o metodo POST, com um JSON como body que deve conter ser parecido com o seguinte:

```JSON
  {
	"numeroSalasCirurgicas": 12,
	"numeroCirurgiasSalaDia": 6,
	"intervaloDePicoCME": 12,
	"numeroLeitosUTI": 30,
	"numeroLeitosInternacao": 38,
	"numeroLeitosRPA": 37,
	"numeroLeitosObservacao": 37,
	"numeroLeitosHospitalDia": 37
}
```

Se você seguiu o exemplo até aqui e fez tudo certo você deve estar vendo a seguinte resposta:

```JSON
[
	[
		3, // Número de Autoclaves para atender a demanda
		[
                          // Lista de modelos de Autoclaves recomendadas
			{
				"marca": "A",
				"modelo": "A8",
				"preco": 2500
			},
			{
				"marca": "A",
				"modelo": "A9",
				"preco": 2400
			},
			{
				"marca": "B",
				"modelo": "B7",
				"preco": 2300
			},
			{
				"marca": "B",
				"modelo": "B8",
				"preco": 1300
			},
			{
				"marca": "C",
				"modelo": "C5",
				"preco": 1500
			},
			{
				"marca": "C",
				"modelo": "C6",
				"preco": 2100
			},
			{
				"marca": "D",
				"modelo": "D7",
				"preco": 3000
			},
			{
				"marca": "D",
				"modelo": "D8",
				"preco": 1100
			},
			{
				"marca": "E",
				"modelo": "E4",
				"preco": 1500
			},
			{
				"marca": "E",
				"modelo": "E5",
				"preco": 1700
			},
			{
				"marca": "F",
				"modelo": "F2",
				"preco": 2700
			},
			{
				"marca": "F",
				"modelo": "F3",
				"preco": 1000
			}
		]
	],
	[
		2, // Número de Lavadoras para atender a demanda
		[
                          // Lista de modelos de Lavadoras recomendadas
			{
				"marca": "A",
				"modelo": "A2",
				"preco": 1900
			},
			{
				"marca": "B",
				"modelo": "B2",
				"preco": 2900
			},
			{
				"marca": "C",
				"modelo": "C2",
				"preco": 1200
			},
			{
				"marca": "D",
				"modelo": "D1",
				"preco": 1600
			},
			{
				"marca": "D",
				"modelo": "D2",
				"preco": 1000
			},
			{
				"marca": "E",
				"modelo": "E2",
				"preco": 1900
			},
			{
				"marca": "E",
				"modelo": "E3",
				"preco": 1700
			},
			{
				"marca": "F",
				"modelo": "F1",
				"preco": 1800
			}
		]
	]
]
```
