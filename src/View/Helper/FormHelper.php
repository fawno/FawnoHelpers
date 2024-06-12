<?php
	namespace FawnoHelpers\View\Helper;

	use Bootstrap\View\Helper\FormHelper as BootstrapFormHelper;

	class FormHelper extends BootstrapFormHelper {
		public function control($fieldName, array $options = []) : string {
			$multiple = (bool) ($options['multiple'] ?? false);

			$placeholder = $options['placeholder'] ?? __('Drag and drop file here… (or click to select file)');
			$placeholders = $options['placeholder'] ?? __('Drag and drop files here… (or click to select files)');

			switch (($options['type'] ?? null)) {
				case 'file':
					$options['_input'] = $options['_input'] ?? [
						'name' => '',
						'placeholder' => $multiple ? $placeholders : $placeholder,
					];
					break;
				case 'dropzone':
					$control = '';
					$control .= $this->Html->div('form-group dropzone');
					$control .= $this->input($fieldName, ['type' => 'file'] + $options);
					$control .= $this->Html->div('input-group');
					$control .= $this->Html->div('placeholder', $multiple ? $placeholders : $placeholder);
					$control .= $this->Html->tag('/div');
					$control .= $this->Html->tag('/div');
					return $control;
					break;
				case 'dropzone-auto':
					$control = '';
					$control .= $this->Html->div('form-group dropzone-auto', null, $options);
					$control .= $this->Html->div('input-group');
					$control .= $this->Html->div('placeholder', $options['placeholder'] ?? __('Arrastre y suelte aquí los archivos…'));
					$control .= $this->Html->tag('/div');
					$control .= $this->Html->tag('table', null, ['class' => 'table table-striped table-hover']);
					$control .= $this->Html->tag('thead');
					$control .= $this->Html->tag('tr');
					$control .= $this->Html->tag('th', '');
					$control .= $this->Html->tag('th', '');
					$control .= $this->Html->tag('th', '');
					$control .= $this->Html->tag('th', '', ['class' => 'toolbar']);
					$control .= $this->Html->tag('/tr');
					$control .= $this->Html->tag('/thead');
					$control .= $this->Html->tag('tbody', '');
					$control .= $this->Html->tag('/table');
					$control .= $this->Html->tag('/div');
					return $control;
					break;
			}

			return parent::control($fieldName, $options);
		}
	}
