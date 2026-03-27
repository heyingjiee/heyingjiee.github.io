# LLM

## LLM 调研

### 职责方向

#### LLM训练 (LLM Trainer)

* 职责：从零开始或在海量数据上训练全新的基座模型。这是技术门槛最高、计算成本最大的方向，通常由顶尖科技公司或研究机构的算法团队负责

- 关键技术：分布式训练框架（如 DeepSpeed）、PyTorch、海量数据处理、模型架构设计



#### LLM微调 (LLM Fine-tuning)

- 职责：在已有的预训练模型基础上，使用特定领域的数据（如法律、医疗、金融）进行二次训练，使其更专业化。这是目前企业应用大模型的主流方向。

- 关键技术：参数高效微调技术（PEFT），如 LoRA、QLoRA，以及 TRL (Transformer Reinforcement Learning) 等

  

#### LLM应用开发 (LLM Application Develope)

- 职责：不直接改动模型参数，而是将大模型作为一种能力，结合提示工程、外部工具和业务流程，构建上层应用。这是目前需求量最大、最贴近业务的岗位
- 关键技术：
  - 提示词工程：设计高效的提示词，如思维链（CoT）、少样本学习（Few-shot）
  - 检索增强生成 (RAG)：通过连接向量数据库，让模型能够利用私有知识回答问题
  - 智能体 (Agent)：让模型能够调用外部工具（如搜索引擎、API、计算器）来完成复杂任务
  - 应用框架：使用 LangChain、LlamaIndex 等框架进行快速开发和流程编排



#### LLM部署 (LLMOps / Deployment)

- 职责：负责将训练或微调好的模型高效、稳定地部署到生产环境，并保障其持续运行
- 关键技术：

​		模型量化：使用 GGUF、GPTQ、AWQ 等技术降低模型精度，以减少内存占用和提升推理速度。

​		推理优化：利用 TensorRT、ONNX、vLLM 等工具加速模型推理。

​		服务部署：使用 Docker、Kubernetes 等进行容器化部署和扩缩容管理。

​		模型监控：监控模型的性能、延迟、成本以及输出质量。



#### LLM模型推理加速

- TensorRT, SGLang, vLLM 推理引擎/框架 ， Triton 推理服务器解决并发请求、资源分配和API接口问题

| **工具名称** | **核心定位**    | **开发者**  | **关键特点**                                                 |
| ------------ | --------------- | ----------- | ------------------------------------------------------------ |
| vLLM         | 通用推理框架    | UC Berkeley | 易用性之王。通过 PagedAttention 技术解决显存碎片问题，开箱即用，生态最成熟，适合大多数通用场景。 |
| SGLang       | 结构化/编排框架 | UC Berkeley | 复杂任务专家。擅长处理多轮对话（RadixAttention）和结构化输出（JSON/XML）。引入了 DSL（领域特定语言）来优化控制流。 |
| TensorRT-LLM | 极致性能引擎    | NVIDIA      | 性能怪兽。专为 NVIDIA GPU 深度优化，通过算子融合和量化（FP8/INT8）压榨硬件极限，但编译和部署流程较复杂。 |
| Triton       | 推理服务器      | NVIDIA      | 全能管家。它不直接负责模型计算内核，而是负责管理请求队列、动态批处理和模型版本控制。它可以作为 TensorRT-LLM 的“外壳”对外提供服务。 |

- 量化、剪枝、动态 shape、算子融合优化方法
- 分布式推理常用加速方法



### 部分术语

* Post Pretrain (后预训练 / 持续预训练)

  在基础模型（Base Model）完成大规模通用语料预训练后，使用特定领域（如医疗、法律、代码）或特定质量的数据继续进行预训练

- 蒸馏 (Distillation / Knowledge Distillation)

  让一个大模型（教师模型，Teacher）教一个小模型（学生模型，Student）。在保持较高性能的前提下，大幅减小模型体积，降低推理成本，便于部署在手机或边缘设备上

- SFT (Supervised Fine-Tuning, 有监督微调)

  使用高质量的“问题 - 答案”对（指令数据）对预训练模型进行微调

- ML（**Machine Learning**） 机器学习

- 强化学习 (RL, Reinforcement Learning) & RM (Reward Model, 奖励模型)

​		RM (奖励模型)：这是一个专门训练出来的模型，用来给大模型的回答“打分”。它模仿人类的偏好（比如喜欢有用、诚实、无害的回答）。

​		RL (强化学习)：利用 RM 的打分作为奖励信号，通过强化学习算法（如 PPO）进一步优化大模型。

​		目的：解决 SFT 无法处理的复杂偏好对齐问题，让模型更符合人类价值观（RLHF: RL from Human Feedback）

- DPO (Direct Preference Optimization, 直接偏好优化) vs PPO (Proximal Policy Optimization)

​		PPO：传统的强化学习算法。需要训练一个额外的奖励模型（RM），过程复杂、显存占用高、训练不稳定。

​		DPO：一种新兴的替代方案。它不需要单独训练奖励模型，而是通过数学推导，直接用人类偏好数据（好回答 vs 坏回答）来优化策略模型。

​		对比：DPO 更稳定、更省显存、更容易复现，目前已成为微调的主流选择；PPO 则是经典但沉重的方法。



- 混合精度 (Mixed Precision)

  在训练或推理时，同时使用 FP16（半精度）或 BF16 进行计算，而用 FP32（单精度）存储主权重以累积梯度。可以大幅减少显存占用，提高计算吞吐量（Tensor Core 对低精度计算优化极好），同时保持模型精度不损失。

- 量化加速 (Quantization)

  把模型权重从“高精度浮点数”压缩成“低精度整数”。模型体积变小，显存占用减半，数据传输更快，生成速度直接翻倍。

- KV Cache 管理 (Key-Value Cache Management)

  在生成文本时，为了避免重复计算之前的 Token，模型会缓存每一层的 Key 和 Value 矩阵。但是，随着生成长度增加，KV Cache 会占满显存，导致无法继续生成或并发度下降。可以通过 PagedAttention (vLLM 核心技术，像操作系统内存分页一样管理 KV)、KV Cache Eviction (淘汰不重要的缓存)、Multi-Query Attention (MQA) 等提高长上下文推理效率，增加并发请求数（Throughput）

- 推理调度 (Inference Scheduling)

  在服务器端，如何高效地安排多个用户的推理请求。核心技术：

  * Continuous Batching (连续批处理)：一旦某个请求生成结束，立即插入新请求，不用等整个批次完成
  * Prefill/Decode 分离：将预处理（输入）和解码（生成）阶段分开调度，优化 GPU 利用率。

​	目的：最大化 GPU 利用率，降低首字延迟（TTFT），提高每秒/token 输出速度。代表框架：vLLM, TGI。

- 算子优化 (如 FlashAttention)：

​		原理：重写底层的数学计算代码，利用 GPU 的特殊硬件特性。

​		效果：纯粹的算力压榨，让计算本身更快。



### 知名模型

- PaLM (Pathways Language Model)
  - 来源：Google。
  - 特点：基于 Pathways 系统架构，强调高效训练超大模型。后续演变为 PaLM 2 和 Gemini 系列。它以强大的多语言能力和逻辑推理著称，是 Google 早期对抗 GPT-3/4 的主力。



- GLM (Generalized Language Model)
  - 来源：清华大学 & 智谱 AI (Zhipu AI)。
  - 特点：采用独特的 Prefix LM 架构（自回归 + 自编码混合）。不同于 GPT 的纯单向注意力，GLM 在预训练时对部分掩码进行双向填充。
  - 系列：GLM-1, GLM-Edge, ChatGLM 系列（如 ChatGLM2/3/4），以中文能力强、显存效率高（适合消费级显卡部署）闻名。



- LLaMA (Large Language Model Meta AI)
  - 来源：Meta (Facebook)。
  - 特点：开源界的“基石”。LLaMA 系列（1, 2, 3, 3.1, 3.2）证明了仅使用公开可用数据也能训练出顶级模型。
  - 影响：由于其开放的权重（Open Weights），引发了全球范围内的微调生态爆发（如 Alpaca, Vicuna 等无数衍生模型）。目前 LLaMA 3 是开源模型的性能标杆之一。



-  Bert 



## Hugging Face

hugging face 是知名的大模型托管平台

以 [distilbert/distilbert-base-uncased-finetuned-sst-2-english](https://huggingface.co/distilbert/distilbert-base-uncased-finetuned-sst-2-english) 仓库为例子，看下一个大模型项目中到底包含啥

### 项目结构

```markdown
# 模型配置
|-config.json # 记录模型长啥样（几层、几维）

# 模型参数权重
|-model.safetensors 	# hugging face 主推的格式，更安全/更快的权重格式（推荐用这个）
|-pytorch_model.bin 	# PyTorch 版本
|-rust_model.ot 			# Rust 版本
|-tf_model.h5 				# TensorFlow 版本
|-onnx/ 							# ONNX 推理版本（跨语言部署用）

# 分词器相关配置
|-tokenizer_config.json # 分词器配置参数
|-vocab.txt # 词汇表

# 其他不重要文件
|-.gitattributes
|-README.md
|-map.jpeg
```

### 使用模型

使用 python 提供的 transforms 包，里面提供了一系列工具来读取这些参数信息、配置信息，创建一个真正可以运行模型推理的程序

```python
from transformers import AutoModel, AutoTokenizer

# 下载 -> 解析config.json -> 根据配置构建模型 -> 加载权重参数
model = AutoModel.from_pretrained("distilbert-base-uncased-finetuned-sst-2-english")

# 加载分词器配置 -> 创建分词器
tokenizer = AutoTokenizer.from_pretrained("distilbert-base-uncased-finetuned-sst-2-english")

# 分词器把自然语言处理为张量（ 其实是 3 步： 句子 -> 拆成token -> 数字序列 -> 张量 input IDs）
inputs = tokenizer("I love this!", return_tensors="pt")

# 输入到模型中。 outputs是模型处理的张量数据
outputs = model(**inputs)
```

运行就能看到下载了一系列的配置文件

transformers 内部维护了一个注册表，AutoModel、AutoTokenizer 这两个工具会自动根据模型名自动匹配对应的工具。你也可以自己指定

```python
from transformers import BertModel, BertTokenizer

model = BertModel.from_pretrained("bert-base-cased")
tokenizer = BertTokenizer.from_pretrained("bert-base-cased")
inputs = tokenizer("I love this!", return_tensors="pt")
```

**模型参数权重**

大模型训练后的参数权重，这是大模型的核心，一般会提供支持多种工具的形式

**分词器配置 （tokenizer）**

模型只能处理数字，这个分词器配置告诉 transforms 工具库咋配置分词器。 模型训练时使用分词器 A 转化 token，然后根据词汇表（vocabulary）把 token 映射为数字，传递给模型进行训练。所以我们在调用模型时也需要使用相同的 tokenizer、vocabulary 才行正常使用模型

```json
// tokenizer_config.json

{
  "tokenizer_class": "BertTokenizerFast" // 模型分词器
  // ...
}

// vocab.txt
[PAD]
[unused0]
[unused1]
[unused2]
[unused3]
[unused4]
...
```

### 编解码

所有的LLM 本质都是概率运算，只能数字输入、数字输出。所以需要把自然语言安装一定的规则转为数字（编码），把数字转化为自然语言（解码）

每个大模型使用的方式可能不同，部署大模型使用的编解码的分词器、词汇表必须与训练时的一致

编码

```python
from transformers import AutoTokenizer
import torch

tokenizer = AutoTokenizer.from_pretrained("bert-base-cased")

sequence = "Using a Transformer network is simple"

# 分词
tokens = tokenizer.tokenize(sequence) # 基于子词的分词器
print(tokens) # ['Using', 'a', 'transform', '##er', 'network', 'is', 'simple']

# 查词汇表（vocab.txt）映射为数字
ids = tokenizer.convert_tokens_to_ids(tokens) #
print(ids) # [7993, 170, 11303, 1200, 2443, 1110, 3014]

# 转化为张量。模型接受2维数组，所以这里多了一层[ids]
input_ids = torch.tensor([ids])
print(input_ids) # [[ 1045, 1005, 2310, 2042, 3403, 2005, 1037, 17662, 12172, 2607, 2026, 2878, 2166, 1012]]

# 输入模型
output = model(input_ids)
print(output.logits) # [[-2.7276, 2.8789]]
```

解码

```python
decoded_string = tokenizer.decode([7993, 170, 11303, 1200, 2443, 1110, 3014])
print(decoded_string) # 'Using a Transformer network is simple'
```





