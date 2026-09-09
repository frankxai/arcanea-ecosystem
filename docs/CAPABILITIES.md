# Arcanea capabilities and delivery

Arcanea's creator skills, media tools, worldbuilding server and older extension
forks have different contracts. Choose by the required outcome and verify the
delivery stage before installing or connecting anything.

| Surface | Source | Evidence to check |
| --- | --- | --- |
| Creator skills and offline workflows | `arcanea-agent-skills` | Source registry, compiled receipt, plugin doctor, enabled host entry |
| Media creator MCP | `arcanea-mcp-generate` (local directory `arcanea-mcp`) | Build, stdio smoke tests, pack validation, npm readiness |
| Worldbuilding MCP | `arcanea-ai-app/packages/arcanea-mcp` | Actual tool inventory, local state behavior, safe request result |
| Codex creator plugin | Compiled by `arcanea-agent-skills` | `arcanea-creative-worlds@arcanea`; full-pack byte comparison |
| LobeHub extension registry and SDK forks | `arcanea-plugins`, `arcanea-plugin-sdk` | Upstream compatibility and supported host; not Codex plugin identity |
| Public MCP starter | `arcanea-mcp-starter` | Repository build and examples; separate from either creator runtime |
| Public developer reference | [arcanea.dev](https://arcanea.dev/) | Production HTTP response and deployment commit for each route |
| World Proof front door | [arcanea.academy](https://arcanea.academy/) | Deterministic output, browser privacy boundary and deployment evidence |

The creator Gateway is a contract-only integration design. Its schema and policy
probes do not establish a hosted service. A checked-out package with sibling links
does not establish npm availability. A public repository or HTTP 200 does not prove
that its tools execute successfully.

## Access and installation observations

Checked on 2026-09-09; these observations are not a live availability feed.

- `arcanea-agent-skills` and `arcanea-mcp-generate` are private repositories.
  Their contributor instructions require access. An installed local pack does
  not establish a public marketplace release.
- The public npm manifest for
  [`@arcanea/mcp-server@0.7.0`](https://registry.npmjs.org/@arcanea%2fmcp-server/0.7.0)
  contains `@arcanea/os: workspace:*`. A fresh npm package-lock-only installation
  with scripts disabled failed with `EUNSUPPORTEDPROTOCOL`. Do not advertise an
  unpinned npx command as working until the replacement passes a consumer install.
- The [public source mirror](https://github.com/frankxai/arcanea/tree/main/packages/arcanea-mcp)
  and published npm artifact contain different revisions. Compare the actual
  manifest, built CLI version and returned tool inventory rather than inferring
  one from another.
- The world-pack checker implementation is not present in the public mirror at
  this date. Its recorded website examples require private source access to
  reproduce. An MCP interface sketch is not an implemented adapter.

For a new release, inspect the packed manifest for workspace, file and link
dependencies, then perform an isolated consumer installation and a real stdio
handshake without provider credentials. Keep these as separate evidence stages.
Published metadata, installability, runtime discovery and useful tool behavior
each need their own result.

## Repeat the inventory

```sh
node scripts/audit-capabilities.mjs --repos-root /path/to/repos --skills-root /path/to/.agents/skills
node --test tests/capability-audit.test.mjs
```

The audit inspects immediate Arcanea-named child repositories and only the explicit
skill registries. It rejects home/drive-root scans and inherited parent Git roots.
It records structural skill findings and source metadata without reading MCP
configuration contents, credentials, or environment values. Save machine-specific
output privately; review and sanitize it before sharing.

The output counts files, including generated skill copies. It does not label the
sum as unique skills or certify runtime behavior. Supply additional skill roots
explicitly and inspect enabled plugins through the relevant host CLI.

Use [the Arcanea meta skill](../skills/arcanea-meta/SKILL.md) for the complete
evidence and routing procedure.
