# ComfyUI-MCP Integration Stub (Arcanea Studio Priority #1)

**Status**: Text-first stub under CRITICAL disk (45 GiB). Full implementation when free ≥50–80 GiB.  
**Owner**: Technology Guardian  
**Priority**: Highest technical (per Partner Matrix + Partner Outreach Plan)

## Why First
ComfyUI-MCP (artokun/comfyui-mcp and ecosystem) provides 108+ tools, full graph control, local-first Flux/WAN/LTX/Qwen/etc. Perfect sovereign match for arcanea-studio router + world asset pipelines.

## Stub Design (Next Implementation Steps)
1. **MCP Server Skeleton** (`arcanea-mcp` or extend existing):
   - Tools: `comfy.generate_image`, `comfy.run_workflow`, `comfy.load_world_brief`, `comfy.export_to_world_repo`.
2. **Router Adapter**:
   - Add `providers/comfyui.js` (or MCP bridge) to `arcanea-studio/src/lib/router/`.
   - TaskMap entries for image.t2i / i2i / video.* when ComfyUI available.
3. **World Brief Injection**:
   - Load visual DNA + characters from world.arcanea.json.
   - Inject as ControlNet / IP-Adapter / LoRA context where possible.
4. **Lineage**:
   - Return assets with provenance (model, seed, world hash, Luminor archetype).
5. **PR Loop**:
   - Auto-propose assets back to world repo via git worktree (when disk allows).

## Immediate Text Actions (This Cycle)
- Document interface contract (this file).
- Add skill `studio-dispatch` already references multi-provider.
- Future: `hermes mcp add comfyui` once server exists.
- Success metric: First successful local image gen with world brief → PR-ready asset.

## Acceptance Criteria
- [ ] MCP server starts and lists tools.
- [ ] Studio router can dispatch to ComfyUI.
- [ ] World DNA injected.
- [ ] Lineage metadata present.
- [ ] Dry-run PR path works.

**References**: ARCANEA_PARTNER_MATRIX_AND_CONNECTORS.md, studio router README, artokun/comfyui-mcp.
