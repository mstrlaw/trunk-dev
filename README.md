# Trunk Based Development PoC

### Complete repo demonstrating how to setup GitHub Actions for doing [Trunk Based Development](https://trunkbaseddevelopment.com/)

#### Environments
[![Production - trunk-dev.vercel.app](https://img.shields.io/static/v1?label=Production&message=trunk-dev.vercel.app&color=blue)](https://trunk-dev.vercel.app/)

[![Staging - trunk-dev-staging.vercel.app](https://img.shields.io/static/v1?label=Staging&message=trunk-dev-staging.vercel.app&color=orange)](https://trunk-dev-staging.vercel.app/)

**Bonus**:
- Using [Playwright](https://playwright.dev/) for running E2E tests when integrating code
- Deploying to [Vercel](https://vercel.com/)

### Workflow Concepts

1. A Workflow is what GitHub calls Action(s)
2. Actions can have one or more Jobs, with one or more Steps
3. Workflows are created under `.github/workflows` (GitHub treats any yml file under `workflows` as an Action to be executed)
4. File name follows a pattern to loosely indicate the trigger method `on_<trigger-method>.yml`

### How it works

1. Dev _commits code_ to any branch (no open PR yet) -> Execute Linting job and deploys a preview URL to Vercel
2. PR is _opened_ into `main` branch -> Execute Test jobs
3. PR is _merged_ into `main` branch -> Project deployed to Staging env
4. Tag is _created_ from `main` branch -> Project deployed to Production env

```mermaid
sequenceDiagram
    actor D as Dev
    participant B as Branch
    participant M as Main
    participant V as Vercel

    box GitHub
        participant B
        participant M
    end

    loop Push Code
        D->>B: Commit XYZ
        Note over B: 1.Lint<br>2.Built<br>3.Trigger Vercel Deploy
        B->>V: Deploy <Preview>
        Note over V: github-actions-vercel-8ga3p0aks-surfe.vercel.app
    end

    alt Open PR
        B->>M: New PR
        Note over M: 1.Build<br>2.1.Run Tests (Unit)<br>2.2.Run Tests (E2E)
    end
    
    alt Merge PR
        B->>M: Merge PR
        Note over M: 1.Build<br>2.Trigger Vercel Deploy
        M->>V: Deploy <Staging>
        Note over V: trunkbased-cicd-workflow-staging.vercel.app
    end

    loop Create Tag

        Note over M: 1.Build<br>2.Trigger Vercel Deploy
        M->>V: Deploy <Prod>
        Note over V: trunkbased-cicd-workflow.vercel.app
    end
```

### PoC Details

- Project is a simple static site with 2 pages
- Server is ran using [PM2](https://www.npmjs.com/package/pm2), which allows to run it in the background without blocking execution of job steps
- Interfacing with Vercel in the CI is done using their [CLI](https://vercel.com/docs/cli)
- Vercel project and org keys must be setup for using the CLI