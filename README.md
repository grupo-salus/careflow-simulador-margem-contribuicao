# 🏥 Careflow - Simulador de Margem de Contribuição

Uma aplicação web moderna para calcular margens de contribuição de procedimentos estéticos, desenvolvida para clínicas e profissionais da área de estética.

## 📋 Sobre o Projeto

O **Simulador de Margem de Contribuição** é uma ferramenta especializada que permite aos profissionais de estética calcular a rentabilidade de seus procedimentos de forma precisa e intuitiva. A aplicação considera custos variáveis, tempo de sessão e número de sessões para fornecer análises detalhadas de margem de contribuição.

### 🎯 Funcionalidades Principais

- **Seleção de Procedimentos**: Catálogo pré-configurado com procedimentos estéticos comuns
- **Cálculo Automático**: Margem de contribuição calculada em tempo real
- **Análise Detalhada**: Receita total, custos variáveis, margem percentual e lucro por hora
- **Interface Intuitiva**: Design responsivo e moderno com Tailwind CSS
- **Dados em Tempo Real**: Atualização automática dos resultados conforme os parâmetros são alterados

## 🚀 Tecnologias Utilizadas

- **React 18** - Biblioteca JavaScript para interfaces de usuário
- **TypeScript** - Tipagem estática para JavaScript
- **Vite** - Build tool e dev server ultra-rápido
- **Tailwind CSS** - Framework CSS utilitário
- **Lucide React** - Biblioteca de ícones modernos
- **ESLint** - Linter para qualidade de código

## 📊 Procedimentos Disponíveis

A aplicação inclui um catálogo de procedimentos estéticos com dados pré-configurados:

- **Depilação a Laser - Pernas** (8 sessões, 45 min/sessão)
- **Criolipólise - Flancos** (4 sessões, 60 min/sessão)
- **Radiofrequência Facial** (6 sessões, 50 min/sessão)
- **Massagem Modeladora** (10 sessões, 40 min/sessão)
- **Microagulhamento Facial** (4 sessões, 55 min/sessão)

## 🧮 Cálculos Realizados

### Fórmulas Utilizadas

1. **Receita Total**: `Preço por Sessão × Número de Sessões`
2. **Custo Total Variável**: `Custo Variável por Sessão × Número de Sessões`
3. **Margem de Contribuição**: `Receita Total - Custo Total Variável`
4. **Margem Percentual**: `(Margem de Contribuição / Receita Total) × 100`
5. **Margem por Sessão**: `Margem de Contribuição / Número de Sessões`
6. **Tempo Total**: `(Número de Sessões × Tempo por Sessão) / 60` (em horas)
7. **Lucro por Hora**: `Margem de Contribuição / Tempo Total`

### Insumos Considerados

Cada procedimento inclui uma lista detalhada de insumos com seus respectivos custos:

- Géis condutores e de contato
- Luvas descartáveis
- Materiais de proteção
- Produtos específicos do procedimento

## 🛠️ Instalação e Execução

### Pré-requisitos

- Node.js (versão 16 ou superior)
- npm ou yarn

### Passos para Instalação

1. **Clone o repositório**

   ```bash
   git clone https://github.com/seu-usuario/careflow-simulador-margem-contribuicao.git
   cd careflow-simulador-margem-contribuicao
   ```

2. **Instale as dependências**

   ```bash
   npm install
   ```

3. **Execute o projeto em modo de desenvolvimento**

   ```bash
   npm run dev
   ```

4. **Acesse a aplicação**
   Abra [http://localhost:5173](http://localhost:5173) no seu navegador

### Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Gera a build de produção
- `npm run preview` - Visualiza a build de produção
- `npm run lint` - Executa o linter para verificar qualidade do código
- `npm run deploy` - Faz o deploy para o GitHub Pages

## 🚀 Deploy no GitHub Pages

### Configuração Automática

1. **Configure o GitHub Pages no repositório:**

   - Vá para Settings > Pages
   - Source: Deploy from a branch
   - Branch: gh-pages
   - Folder: / (root)

2. **Execute o deploy:**

   ```bash
   npm run deploy
   ```

3. **Acesse a aplicação:**
   - URL: `https://seu-usuario.github.io/careflow-simulador-margem-contribuicao/`

### Configurações Realizadas

- ✅ **Base path configurado** no `vite.config.ts`
- ✅ **Script de deploy** adicionado no `package.json`
- ✅ **gh-pages** instalado como dependência
- ✅ **Build testado** e funcionando

## 📁 Estrutura do Projeto

```
src/
├── components/          # Componentes React reutilizáveis
│   ├── CostBreakdown.tsx
│   ├── InputField.tsx
│   ├── ProcedureSelector.tsx
│   ├── ResultCard.tsx
│   └── SimulationForm.tsx
├── data/               # Dados estáticos
│   └── procedures.json
├── services/           # Lógica de negócio
│   └── marginCalculator.ts
├── types/              # Definições de tipos TypeScript
│   └── index.ts
├── App.tsx             # Componente principal
├── main.tsx            # Ponto de entrada
└── index.css           # Estilos globais
```

## 🎨 Interface do Usuário

### Design System

A aplicação utiliza um design system consistente com:

- **Cores**: Paleta baseada na identidade visual do Careflow
- **Tipografia**: Hierarquia clara de textos
- **Componentes**: Cards, formulários e indicadores padronizados
- **Responsividade**: Layout adaptável para desktop e mobile

### Componentes Principais

- **ProcedureSelector**: Seleção de procedimentos com cards visuais
- **SimulationForm**: Formulário para ajuste de parâmetros
- **ResultCard**: Exibição de resultados com indicadores visuais
- **CostBreakdown**: Detalhamento dos custos por insumo

## 🔧 Configuração e Personalização

### Adicionando Novos Procedimentos

Para adicionar novos procedimentos, edite o arquivo `src/data/procedures.json`:

```json
{
  "id": "novo-procedimento",
  "nome": "Nome do Procedimento",
  "precoSugerido": 150,
  "numeroSessoes": 6,
  "tempoSessaoMin": 45,
  "insumos": [
    { "nome": "Insumo 1", "valor": 5.0 },
    { "nome": "Insumo 2", "valor": 3.5 }
  ]
}
```

### Personalizando Estilos

Os estilos podem ser personalizados através do arquivo `tailwind.config.js` e das classes CSS customizadas em `src/index.css`.

## 📈 Métricas e Indicadores

A aplicação fornece os seguintes indicadores financeiros:

- **Receita Total**: Valor total arrecadado com o procedimento
- **Custo Total Variável**: Soma de todos os custos variáveis
- **Margem de Contribuição**: Diferença entre receita e custos variáveis
- **Margem Percentual**: Percentual da margem em relação à receita
- **Margem por Sessão**: Valor da margem dividido pelo número de sessões
- **Lucro por Hora**: Rentabilidade considerando o tempo investido
