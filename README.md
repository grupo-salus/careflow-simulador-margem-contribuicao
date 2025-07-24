# 🏥 Careflow - Simulador de Margem de Contribuição

Uma aplicação web moderna para calcular margens de contribuição de procedimentos estéticos, desenvolvida para clínicas e profissionais da área de estética.

## 📋 Sobre o Projeto

O **Simulador de Margem de Contribuição** é uma ferramenta especializada que permite aos profissionais de estética calcular a rentabilidade de seus procedimentos de forma precisa e intuitiva. A aplicação considera custos variáveis, custos profissionais, tempo de sessão e número de sessões para fornecer análises detalhadas de margem de contribuição.

### 🎯 Funcionalidades Principais

- **Seleção de Procedimentos**: Catálogo com 42 procedimentos estéticos organizados alfabeticamente
- **Busca Inteligente**: Filtro em tempo real com ordenação alfabética
- **Modal de Seleção**: Tabela completa com paginação e informações detalhadas
- **Cálculo Automático**: Margem de contribuição calculada em tempo real
- **Análise Detalhada**: Receita total, custos variáveis, margem percentual e lucro por hora
- **Interface Intuitiva**: Design responsivo e moderno com identidade visual do Careflow
- **Dados em Tempo Real**: Atualização automática dos resultados conforme os parâmetros são alterados

## 🚀 Tecnologias Utilizadas

- **React 18** - Biblioteca JavaScript para interfaces de usuário
- **TypeScript** - Tipagem estática para JavaScript
- **Vite** - Build tool e dev server ultra-rápido
- **Tailwind CSS** - Framework CSS utilitário
- **Lucide React** - Biblioteca de ícones modernos
- **ESLint** - Linter para qualidade de código
- **gh-pages** - Deploy automático para GitHub Pages

## 📊 Procedimentos Disponíveis

A aplicação inclui um catálogo completo de **42 procedimentos estéticos** organizados alfabeticamente, incluindo:

- **Procedimentos Faciais**: Botox, preenchimento labial, peeling, radiofrequência, microagulhamento
- **Procedimentos Corporais**: Criolipólise, drenagem linfática, endermologia, vacumterapia
- **Depilação a Laser**: Pernas, axilas, buco
- **Tratamentos Específicos**: Acne, celulite, estrias, flacidez, manchas, melasma
- **Procedimentos Capilares**: Hidratação, escova progressiva, coloração
- **Estética das Unhas**: Manicure, pedicure, alongamento

Todos os procedimentos incluem dados completos de custos, tempo de sessão e número de sessões recomendadas.

## 🧮 Cálculos Realizados

### Fórmulas Atualizadas

1. **Custo Insumos por Sessão**: `Soma de todos os insumos do procedimento`
2. **Custo Total por Sessão**: `Custo Insumos + Custo Profissional por Sessão`
3. **Receita Total**: `Preço por Sessão × Número de Sessões`
4. **Custo Total Variável**: `Custo Total por Sessão × Número de Sessões`
5. **Margem de Contribuição Total**: `Receita Total - Custo Total Variável`
6. **Margem por Sessão**: `Margem de Contribuição Total / Número de Sessões`
7. **Margem de Contribuição %**: `(Margem por Sessão / Preço por Sessão) × 100`
8. **Tempo Total**: `(Número de Sessões × Tempo por Sessão) / 60` (em horas)
9. **Lucro Operacional por Hora**: `Margem de Contribuição Total / Tempo Total`

### Estrutura de Custos

Cada procedimento inclui:

- **Custo Profissional por Sessão**: R$ 18,78 (padrão para todos os procedimentos)
- **Insumos Específicos**: Lista detalhada com custos individuais
- **Custo Total por Sessão**: Soma do custo profissional + insumos

## 📁 Estrutura do JSON

### Formato Atualizado

```json
{
  "id": 1,
  "nome": "Nome do Procedimento",
  "precoSugerido": 150,
  "numeroSessoes": 6,
  "tempoSessaoMin": 45,
  "custoProfissionalPorSessao": 18.78,
  "insumos": [
    { "nome": "Insumo 1", "valor": 5.0 },
    { "nome": "Insumo 2", "valor": 3.5 }
  ]
}
```

### Campos Obrigatórios

- **id**: Número sequencial (1-42)
- **nome**: Nome do procedimento
- **precoSugerido**: Preço sugerido em reais
- **numeroSessoes**: Número de sessões do tratamento
- **tempoSessaoMin**: Duração de cada sessão em minutos
- **custoProfissionalPorSessao**: Custo do profissional por sessão
- **insumos**: Array com nome e valor de cada insumo

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
│   ├── ProcedureSelectionModal.tsx
│   ├── ResultCard.tsx
│   ├── SimulationForm.tsx
│   ├── SearchInput.tsx
│   ├── Modal.tsx
│   └── Pagination.tsx
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

A aplicação utiliza um design system consistente com a identidade visual do Careflow:

- **Cores**: Paleta baseada na identidade visual do Careflow (roxo, rosa, cinzas)
- **Tipografia**: Hierarquia clara de textos
- **Componentes**: Cards, formulários e indicadores padronizados
- **Responsividade**: Layout adaptável para desktop e mobile
- **Navbar**: Logo do Careflow com identidade visual consistente

### Componentes Principais

- **ProcedureSelector**: Seleção de procedimentos com busca e modal
- **ProcedureSelectionModal**: Modal com tabela completa e paginação
- **SimulationForm**: Formulário para ajuste de parâmetros
- **ResultCard**: Exibição de resultados com indicadores visuais
- **CostBreakdown**: Detalhamento dos custos por insumo
- **SearchInput**: Campo de busca com funcionalidades avançadas

## 🔧 Configuração e Personalização

### Adicionando Novos Procedimentos

Para adicionar novos procedimentos, edite o arquivo `src/data/procedures.json`:

```json
{
  "id": 43,
  "nome": "Novo Procedimento",
  "precoSugerido": 150,
  "numeroSessoes": 6,
  "tempoSessaoMin": 45,
  "custoProfissionalPorSessao": 18.78,
  "insumos": [
    { "nome": "Insumo 1", "valor": 5.0 },
    { "nome": "Insumo 2", "valor": 3.5 }
  ]
}
```

### Personalizando Estilos

Os estilos podem ser personalizados através do arquivo `tailwind.config.js` e das classes CSS customizadas em `src/index.css`.

## 📈 Métricas e Indicadores

A aplicação fornece os seguintes indicadores financeiros em ordem lógica:

1. **Custo Total por Sessão**: Soma do custo profissional + insumos
2. **Receita Total**: Valor total arrecadado com o procedimento
3. **Custo Total Variável**: Soma de todos os custos variáveis
4. **Margem de Contribuição Total**: Diferença entre receita e custos variáveis
5. **Margem por Sessão**: Valor da margem dividido pelo número de sessões
6. **Margem de Contribuição %**: Percentual da margem em relação ao preço por sessão
7. **Lucro Operacional por Hora**: Rentabilidade considerando o tempo investido

### Breakdown de Custos

- **Custo Profissional**: Destaque visual no topo da lista
- **Insumos**: Lista detalhada com valores individuais
- **Total por Sessão**: Soma de todos os custos

## 🔄 Histórico de Atualizações

### Versão Atual
- ✅ **42 procedimentos** organizados alfabeticamente
- ✅ **IDs numéricos** (1-42) para melhor organização
- ✅ **Custo profissional** integrado aos cálculos
- ✅ **Fórmulas atualizadas** conforme planilha de referência
- ✅ **Modal de seleção** com tabela e paginação
- ✅ **Busca inteligente** com ordenação alfabética
- ✅ **Identidade visual** do Careflow aplicada
- ✅ **Deploy automático** para GitHub Pages
