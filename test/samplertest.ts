import { expect } from "chai";
import { vec3, vec4 } from "gl-matrix";
import { LinearVectorSampler } from "../animation/samplers/LinearVectorSampler";

describe("SamplerTest", function() {
  it("Should instantiate properly", function() {
    const sampler = new LinearVectorSampler<vec4>();
    const val = [1, 2, 3, 4] as vec4;
    sampler.insert(0.5, val);
    const out = vec4.create();
    sampler.sample(1.0, out);

    expect(out.length).to.equal(4);
    for (let i = 0; i < 4; i++) {
      expect(out[i]).to.equal(val[i])
    }
  });

  it("Should interpolate linearly between a pair of keyframes", function() {
    const valA : vec4 = [0, 2, 4, 6];
    const valB : vec4 = [15, 25, 35, 45];

    const half = [7.5, 13.5, 19.5, 25.5];
    const sampler = new LinearVectorSampler<vec4>();
    const out = vec4.create();
    sampler.insert(0.0, valA);
    sampler.insert(1.0, valB);
    sampler.sample(0.5, out);
    expect(out.length).to.equal(4);

    for (let i = 0; i < 4; i++) {
      expect(out[i]).to.approximately(half[i], 0.00001);
    }

    sampler.sample(-0.5, out);
    expect(out.length).to.equal(4);

    for (let i = 0; i < 4; i++) {
      expect(out[i]).to.approximately(valA[i], 0.00001);
    }

    sampler.sample(2.5, out);
    expect(out.length).to.equal(4);

    for (let i = 0; i < 4; i++) {
      expect(out[i]).to.approximately(valB[i], 0.00001);
    }
  });

  it("Should interpolate linearly between several keyframes", function() {
    const valA : vec3 = [0, 0, 0];
    const valC : vec3 = [4, 8, 12];
    const valB : vec3 = [2, 4, 6];
    const valD : vec3 = [6, 12, 18];

    const sampler = new LinearVectorSampler<vec3>();

    sampler.insert(0.0, valA);
    sampler.insert(1.0, valC);
    sampler.insert(0.5, valB);
    sampler.insert(1.5, valD);

    const out = vec3.create();

    for (let i = 0; i <= 1.5; i += 0.01) {
      sampler.sample(i, out);
      for (let j = 0; j < 3; j++) {
        expect(out[j]).to.approximately((j + 1) * i * 4.0, 0.0001);
      }
    }
  });
})