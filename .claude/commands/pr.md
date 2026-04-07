---
description: 깃허브 PR 생성
allowed-tools: Bash, mcp__github__create_pull_request
---

# PR Title & Body Generation

Analyze the changes below, draft a PR title and body, then create the PR using GitHub MCP.

Current branch: !`git branch --show-current`

Commits since develop:
!`git log --oneline develop..HEAD`

Changed files:
!`git diff --stat develop..HEAD`

Diff (excluding lock files):
!`git diff develop..HEAD -- . ':(exclude)bun.lock' ':(exclude)package-lock.json'`

---

## Branching Strategy

| Title Format                                | Base Branch | Condition                                     |
| ------------------------------------------- | ----------- | --------------------------------------------- |
| `v0.0.0` (version)                          | `main`      | Only allowed when current branch is `develop` |
| `feat:`, `fix:`, etc. (conventional commit) | `develop`   | Allowed from any feature branch               |

**Release PR rules** (`v0.0.0` format):

- Must be created from the `develop` branch only.
- If the current branch is not `develop`, print an error message and abort.

## Title Rules

- **General PR**: `<type>: <Korean summary>` (within 50 characters)
  - Types: `feat`, `fix`, `refactor`, `change`, `remove`, `docs`, `chore`
  - Match type to branch prefix (e.g. `feat/xxx` → `feat:`)
  - Example: `feat: 탑뷰 카메라 줌 조절 기능 추가`
- **Release PR**: `v<major>.<minor>.<patch>` format
  - Example: `v1.2.0`

## Body Structure

`.github/PULL_REQUEST_TEMPLATE.md` 템플릿을 그대로 사용한다.

```markdown
## #️⃣연관된 이슈

> ex) #이슈번호, #이슈번호

## 📝작업 내용

> 이번 PR에서 작업한 내용을 간략히 설명해주세요(이미지 첨부 가능)

### 스크린샷 (선택)

## 💬리뷰 요구사항(선택)

> 리뷰어가 특별히 봐주었으면 하는 부분이 있다면 작성해주세요
>
> ex) 메서드 XXX의 이름을 더 잘 짓고 싶은데 혹시 좋은 명칭이 있을까요?
```

## Output & Execution

1. Finalize the **Title** and **Body**.
2. Determine the base branch:
   - If the title starts with `v` followed by a digit → `main` (verify current branch is `develop`)
   - Otherwise → `develop`
3. Create the PR directly using **GitHub MCP** (`mcp__github__create_pull_request`):
   - `owner`: `Dino0204`
   - `repo`: `Train-with-cat`
   - `head`: current branch
   - `base`: branch determined above
4. Return the created PR URL to the user.
